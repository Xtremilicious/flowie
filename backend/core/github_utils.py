from github import Github
import os


class GithubSingleton:
    __instance = None

    @staticmethod
    def get():
        """ Static access method. """
        if GithubSingleton.__instance is None:
            GithubSingleton()
        return GithubSingleton.__instance

    def __init__(self):
        """ Virtually private constructor. """
        if GithubSingleton.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            GithubSingleton.__instance = Github(
                os.environ.get('GITHUB_API_KEY', None)
            )
