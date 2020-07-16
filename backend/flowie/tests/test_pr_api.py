from django.test import TestCase

from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.github_utils import GithubSingleton

PR_LINKED_ISSUE_URL = reverse('flowie:pr_linked_issue-view')


class PRLinkedIssuePublicAPI(TestCase):
    """Tests for PR Linked Issue public API"""

    def setUp(self) -> None:
        self.client = APIClient()
        self.g = GithubSingleton.get()

    def test_view_linked_issues_hashtag(self):
        """Test for viewing linked issues with hashtag"""
        repo_name = 'JuliaPlots/Plots.jl'
        repo = self.g.get_repo(repo_name)
        pr = repo.get_pull(2807)
        issue_1 = repo.get_issue(2202)
        issue_2 = repo.get_issue(2330)

        payload = {
            'body': pr.body,
            'repo_name': repo_name
        }

        res = self.client.post(PR_LINKED_ISSUE_URL, payload)

        self.assertEqual(
            res.status_code, status.HTTP_200_OK
        )
        for linked_issue in res.data:
            for attr in ['html_url', 'title', 'state']:
                self.assertIn(linked_issue[attr], [getattr(
                    issue_1, attr
                ), getattr(issue_2, attr)])

    def test_view_linked_issues_http(self):
        """Test for viewing linked issues with http"""
        repo_name = 'MLH-Fellowship/react-jsonschema-form'
        repo = self.g.get_repo(repo_name)
        pr = repo.get_pull(39)
        issue_1 = repo.get_issue(9)

        payload = {
            'body': pr.body,
            'repo_name': repo_name
        }

        res = self.client.post(PR_LINKED_ISSUE_URL, payload)

        self.assertEqual(
            res.status_code, status.HTTP_200_OK
        )
        for linked_issue in res.data:
            for attr in ['html_url', 'title', 'state']:
                self.assertIn(linked_issue[attr], getattr(
                    issue_1, attr
                ))

    def test_view_linked_issues_none(self):
        """Test for viewing linked issues when none exists"""
        repo_name = 'JuliaPlots/Plots.jl'
        repo = self.g.get_repo(repo_name)
        pr = repo.get_pull(2858)

        payload = {
            'repo_name': repo_name,
            'body': pr.body
        }

        res = self.client.post(PR_LINKED_ISSUE_URL, payload)

        self.assertEqual(
            res.status_code, status.HTTP_200_OK
        )
        self.assertEqual(
            len(res.data), 0
        )

    def test_view_linked_issue_wrong_repo(self):
        """Test linked issue URL with repo that does not exist"""
        res = self.client.post(PR_LINKED_ISSUE_URL,
                               {'repo_name': 'asijdiawj',
                                'body': 'asd'})

        self.assertEqual(
            res.status_code, status.HTTP_400_BAD_REQUEST
        )
        self.assertEqual(
            res.data['message'], 'Bad request'
        )

    def test_view_linked_issue_no_body(self):
        """Test linked issue URL with no body passed"""
        res = self.client.post(PR_LINKED_ISSUE_URL)

        self.assertEqual(
            res.status_code, status.HTTP_400_BAD_REQUEST
        )
        self.assertEqual(
            res.data['message'], 'Bad request'
        )
