from rest_framework import serializers
from .models import Bloque, Categoria

class BloqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bloque
        fields = ['id', 'nombre']

class CategoriaSerializer(serializers.ModelSerializer):
    bloque = BloqueSerializer(read_only=True)
    bloque_id = serializers.PrimaryKeyRelatedField(
        queryset=Bloque.objects.all(),
        source='bloque',
        write_only=True
    )

    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'bloque', 'bloque_id']
