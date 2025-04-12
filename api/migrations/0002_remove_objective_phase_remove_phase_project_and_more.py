# Generated by Django 5.2 on 2025-04-11 23:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="objective",
            name="phase",
        ),
        migrations.RemoveField(
            model_name="phase",
            name="project",
        ),
        migrations.RemoveField(
            model_name="subphase",
            name="phase",
        ),
        migrations.RemoveField(
            model_name="task",
            name="sub_phase",
        ),
        migrations.DeleteModel(
            name="Deliverable",
        ),
        migrations.DeleteModel(
            name="Objective",
        ),
        migrations.DeleteModel(
            name="Phase",
        ),
        migrations.DeleteModel(
            name="SubPhase",
        ),
        migrations.DeleteModel(
            name="Task",
        ),
    ]
