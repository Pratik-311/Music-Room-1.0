from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import * 

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('play', PlaySong.as_view()),
    path('pause', PauseSong.as_view()),
    path('skip', SkipSong.as_view()),
]
