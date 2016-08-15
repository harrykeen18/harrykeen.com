
from django.conf.urls import url

from . import views

app_name = 'home'
urlpatterns = [
  # url(r'^$', views.IndexView.as_view(), name='index'),
  url(r'cv', views.cv, name='cv'),
  url(r'contact', views.contact, name='contact'),
  url(r'projects', views.projects, name='projects'),
  url(r'^$', views.index, name='index'),
  #url(r'', views.index, name='index'),
]

