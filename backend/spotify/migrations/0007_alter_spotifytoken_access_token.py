# Generated by Django 4.1.7 on 2023-02-27 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0006_alter_spotifytoken_access_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(max_length=300),
        ),
    ]