from tastypie.resources import ModelResource
from comic.models import Autor, Comic


class AutorResource(ModelResource):
    class Meta:
        queryset = Autor.objects.all()
        resource_name = 'autor'

class ComicResource(ModelResource):
    class Meta:
        queryset = Comic.objects.all()
        resource_name = 'comic'