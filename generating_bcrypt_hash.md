# Dashboard password

Create a bcrypt password from a bcrypt genereting website, e.g. [bcrypt-generator](https://bcrypt-generator.com/).

**Important** : make sure to enclose your password in **single quotes** when you run `docker run` command :

```bash
$ echo $2b$12$coPqCsPtcF <-- not correct
b2
$ echo "$2b$12$coPqCsPtcF" <-- not correct
b2
$ echo '$2b$12$coPqCsPtcF' <-- correct
$2b$12$coPqCsPtcF
```

**Important** : Please note: don't wrap the generated hash password in single quotes when you use `docker-compose.yml`. Instead, replace each `$` symbol with two `$$` symbols. For example:

```yaml
- PASSWORD_HASH=$$2a$$12$$/XRblNgB2iRxjAwwu8XMkeIUWYKPqH98/eWB5rNXbIJJ.quV89ezG
```

This hash above is for the password 'password', obtained from the website referenced above and then inserted an additional `$` before each existing `$` symbol.

Read more here:

- [parsing $ symbol01](https://github.com/docker/compose/issues/9704#issuecomment-1202335152)
- [parsing $ symbol02](https://github.com/docker/compose/issues/9716)
