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
        payload = {
            'body': pr.body
        }

        res = self.client.post(PR_LINKED_ISSUE_URL, payload)

        self.assertEqual(
            res.status_code, status.HTTP_200_OK
        )
        self.assertEqual(

        )

    def test_view_linked_issues_http(self):
        """Test for viewing linked issues with http"""
        repo = self.g.get_repo('JuliaPlots/Plots.jl')
        pr = repo.get_pull(2807)
        payload = {
            'body': pr.body
        }

        res = self.client.post(PR_LINKED_ISSUE_URL, payload)

        self.assertEqual(
            res.status_code, status.HTTP_200_OK
        )
        self.assertEqual(

        )
