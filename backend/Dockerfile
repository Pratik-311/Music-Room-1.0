FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY requirements.txt ./

RUN pip3 install -r requirements.txt

COPY . .

# ENV PORT=8080

# EXPOSE 8080

# CMD [ "python3", "manage.py", "runserver" ]
# CMD [ "gunicorn", "music_room.wsgi" ]