from __future__ import with_statement
from contextlib import contextmanager as _contextmanager
from fabric.api import *

import git
import os
import sys

try:
    repo = git.Repo(os.getcwd())
    branch = repo.active_branch
    b = raw_input("Qual branch?[%s]"%(branch))
    if b == "":
        b = branch
except:
    print "Erro ao tentar descobrir o nome do branch atual."
    b = raw_input("Qual branch? ")



if b == "master":
    project_folder = "farmaciahumanitas.com.br"
    base_dir = "/home/ubuntu/web/%s" % (project_folder,)
    app_location = base_dir + "/app"
    env_activate = "source %svenv/bin/activate" % (base_dir,)
branch = '%s' % (b,)


@_contextmanager
def project_env_inside_folder():
    with cd(app_location):
        with prefix(env_activate):
            yield

def push():
    with cd(app_location):
        run('git push origin %s'%(branch,))

def pull():
    with cd(app_location):
        run('git pull origin %s'%(branch,))

def collectstatic():
    with project_env_inside_folder():
        run('./manage.py collectstatic')

def syncdb():
    with project_env_inside_folder():
        run('./manage.py syncdb')

def migrate():
    with project_env_inside_folder():
        run('./manage.py migrate')

def reset_server():
    with prefix(env_activate):
        with cd(bin_actions_folder):
            run('./restart')

def sync():
    local("git commit -a")
    local('git push origin %s'%(branch,))
    with cd(app_location):
        run('git pull origin %s'%(branch,))
    reset_server()

def get_server_log():
    with cd(user_logs_folder):
        run('tail -n50 uwsgi.log')

def full_deploy():
    pull()
    syncdb()
    migrate()
    collectstatic()
    reset_server()

def deploy():
    pull()
    syncdb()
    migrate()
    reset_server()
