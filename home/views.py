from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.template import Context, loader

from django.core.urlresolvers import reverse
from django.views import generic

from django.conf import settings
from django.core.mail import send_mail

import datetime
from django.utils import timezone
    
def index(request):

  # html1 = '<div style="background-color: pink;">'
  # html2 = 'yeh'
  # html3 = '</div></br>'

  # listy = [1,2,3,4,5]

  # # context = Context({"name": "Harry", "html1": html1, "html2": html2, "html3": html3, "n": 0, "listy": listy})

  context = Context({"page": "home.html"})

  template = loader.get_template('index.html')
  return HttpResponse(template.render(context))

def projects(request):

  context = Context({"page": "projects-home.html"})

  template = loader.get_template('index.html')
  return HttpResponse(template.render(context))

def cv(request):

  context = Context({"page": "cv.html"})

  template = loader.get_template('index.html')
  return HttpResponse(template.render(context))

def contact(request):

  context = Context({"page": "contact.html"})

  template = loader.get_template('index.html')
  return HttpResponse(template.render(context))


def submit(request):
  if request.method == 'POST':

    # print 'post'

    form = EmailForm(request.POST)

    # if form.is_valid():
    #   print 'valid'
    # else:
    #   print'not valid'


    if form.is_valid():
      name = request.POST.get ('name', '')
      email = request.POST.get ('email', '')

      update = request.POST.get ('update', '')
      local = request.POST.get ('local', '')
      invest = request.POST.get ('invest', '')

      message = request.POST.get ('message', '')

      date = timezone.now()

      mail_obj = Info(name_text = name, email_text = email, pub_date = date, message_text = message, update_bool = update, local_bool = local, invest_bool = invest)
      mail_obj.save()

      # subject = 'Holy shit someone signed up'
      # message = 'yeh, I know wtf are they thinking?'
      # send_mail(subject, message, settings.EMAIL_HOST_USER,[settings.EMAIL_HOST_USER], fail_silently=False)


      return HttpResponseRedirect(reverse('get_emails:submit'))


  else:
    form = EmailForm()

  return render(request, 'get_emails/index.html', {

    'form': form
    } )