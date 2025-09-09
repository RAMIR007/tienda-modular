from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Bloque, Categoria
from .serializers import BloqueSerializer, CategoriaSerializer

class BloqueViewSet(viewsets.ModelViewSet):
    queryset = Bloque.objects.all()
    serializer_class = BloqueSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['bloque']
