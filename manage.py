#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "humanitas.settings")

    from django.core.management import execute_from_command_line
    from env_vars import set_env_vars
    set_env_vars()
    execute_from_command_line(sys.argv)
