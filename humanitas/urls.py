from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^comments/', include('django.contrib.comments.urls')),
	url(r'^weblog/', include('zinnia.urls')),
    # Examples:
    # url(r'^$', 'humanitas.views.home', name='home'),
    # url(r'^humanitas/', include('humanitas.foo.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
