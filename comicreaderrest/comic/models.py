from django.db import models

# Create your models here.

tematicas = [("Comedia","Comedia"),("Drama","Drama"),("Horror","Horror"),("Vida Diaria","Vida Diaria"),("Noir","Noir"),("Adulto","Adulto")]

class Autor(models.Model):
	nombre = models.CharField(max_length=200)
	biografia = models.CharField(max_length=2000)
	web = models.CharField(max_length=200)
	email = models.CharField(max_length=200)
	contacto = models.CharField(max_length=200)
	mini = models.FileField(upload_to="miniAutor/")

	def __unicode__(self):
		return self.nombre

class Editorial(models.Model):
	nombre = models.CharField(max_length=200)
	biografia = models.CharField(max_length=2000)
	web = models.CharField(max_length=200)
	email = models.CharField(max_length=200)
	contacto = models.CharField(max_length=200)
	mini = models.FileField(upload_to="miniEditorial/")

	def __unicode__(self):
		return self.nombre

class Comic(models.Model):
	autor = models.ForeignKey(Autor)
	editorial = models.ForeignKey(Editorial)
	nombre = models.CharField(max_length=200)
	tematica1 = models.CharField(choices=tematicas,max_length=200)
	tematica2 = models.CharField(choices=tematicas,max_length=200)
	tematica3 = models.CharField(choices=tematicas,max_length=200)
	tematica4 = models.CharField(choices=tematicas,max_length=200)
	fecha = models.DateField()
	mini = models.FileField(upload_to="miniComics/")
	descripcion = models.CharField(max_length=2000)

	def __unicode__(self):
		return self.nombre

class Capitulo(models.Model):
	nombre = models.CharField(max_length=200)
	comic = models.ForeignKey(Comic)
	fecha = models.DateField()
	mini = models.FileField(upload_to="miniCapitulo/")
	archivo = models.FileField(upload_to="comics/")
	descripcion = models.CharField(max_length=2000)

	def __unicode__(self):
		return self.nombre
