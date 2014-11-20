What's this?
------------

```beanstalk-admin``` is a small project that creates an API on top of Beanstalkd queue system.

The main aim is to be able to interact with it via a REST interface.

It's written in Golang.

Documentation is coming...

Installing
----------

Create a configuration file (default in ```/etc/beanstalk-admin/beanstalk-admin.conf```) and the contents should look like:

```ini
[HTTP]
port = 8080
limit = 100

[Instance "first_instance"]
host = "my-first-host"
port = 11300

[Instance "second_instance"]
host = "my-second-host"
port = 11300
```

Then:

```
make
sudo make install
```

And boom! Run ```beanstalk-admin``` or ```beanstalk-admin --config my_path_to_config_file```
