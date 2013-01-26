from django.conf.urls import patterns, include, url
from comic.api import AutorResource, ComicResource

autor_resource = AutorResource()
comic_resource = ComicResource()

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'comicreaderrest.views.home', name='home'),
    # url(r'^comicreaderrest/', include('comicreaderrest.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    url(r'^api/', include(autor_resource.urls)),
    url(r'^apicomic/', include(comic_resource.urls)),
)
