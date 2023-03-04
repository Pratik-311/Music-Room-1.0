import time
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write("Waiting for Database...")
        db_up = False
        while db_up is False:
            try:
                self.check(databases = ['default'])
                db_up = True
            except Exception as e:
                print(e)
                self.stdout.write("Database has not yet started, trying in 2 seconds...")
                time.sleep(2)
            
        self.stdout.write(self.style.SUCCESS("Database has started successfylly."))

            
                