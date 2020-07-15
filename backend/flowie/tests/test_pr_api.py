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
        repo = self.g.get_repo('JuliaPlots/Plots.jl')
        pr = repo.get_pull(2807)
        issue_1 = repo.get_issue(2202)
        issue_2 = repo.get_issue(2330)

        payload = {
            'body': pr.body
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
        repo = self.g.get_repo('MLH-Fellowship/react-jsonschema-form')
        pr = repo.get_pull(39)
        issue_1 = repo.get_issue(9)

        payload = {
            'body': pr.body
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
        repo = self.g.get_repo('JuliaPlots/Plots.jl')
        pr = repo.get_pull(2858)

        payload = {
            'body': pr.body
        }

        res = self.client.post(PR_LINKED_ISSUE_URL, payload)

        self.assertEqual(
            res.status_code, status.HTTP_200_OK
        )
        self.assertEqual(
            len(res.data), None
        )
