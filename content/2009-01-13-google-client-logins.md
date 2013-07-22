Title: Google Client Logins
Date: 2009-01-13 21:18
Author: mark
Category: Programming
Tags: google, googleapi, php
Slug: google-client-logins

I'm working on a little PHP app which is going to read data from a
Google Spreadsheet document (more on that later).

The first thing I needed was the ability to authenticate against a
Google Account which lead me to [Authentication for Installed
Applications][]. Pretty straightforward. POST a bunch of variables and,
on successful login, get an Auth code back that can be used for future
queries.

To that end, I threw together a little class to handle logins. I'm sure
it's been done many times before but it was a fun exercise.

<p>
~~~~ {.php name="code"}
class LoginFailedException extends Exception {}class GoogleClientLogin {    public $url;    public $accountType;    public $email;    public $password;    public $service;    public $source;    public static $CALENDAR_SERVICE = 'cl';    public static $SPREADSHEET_SERVICE = 'wise';    private $responseCode;    private $auth;    public function __construct($email, $password, $service, $source, $accountType = 'GOOGLE',                                    $url = 'https://www.google.com/accounts/ClientLogin', $autoLogin = true) {        $this->url = $url;        $this->accountType = $accountType;        $this->email = $email;        $this->password = $password;        $this->service = $service;        $this->source = $source;        if($autoLogin) {            $this->login();        }    }    public function login() {        $postData = array(            'accountType'=>$this->accountType,            'Email'=>$this->email,            'Passwd'=>$this->password,            'service'=>$this->service,            'source'=>$this->source        );        $httprequest = curl_init($this->url);        curl_setopt($httprequest, CURLOPT_SSL_VERIFYPEER, false);        curl_setopt($httprequest, CURLOPT_POST, true);        curl_setopt($httprequest, CURLOPT_RETURNTRANSFER, true);        curl_setopt($httprequest, CURLOPT_HEADER, true);        curl_setopt($httprequest, CURLOPT_POSTFIELDS, $postData);        $rawresult = curl_exec($httprequest);        $result = explode("\n", $rawresult);        foreach($result as $line) {            $matches = array();            if( preg_match('/^HTTP.*?\s([0-9]{3})/', $line, $matches) > 0) {                $this->responseCode = $matches[1];                if($this->responseCode != '200') {                    throw new LoginFailedException('The login attempt failed with a response code of ' . $this->responseCode);                }            }            $matches = array();            if( preg_match('/^Auth=(.*?)$/', $line, $matches) > 0) {                $this->auth = $matches[1];            }        }    }    public function getAuth() {        return $this->auth;    }    public function getResponseCode() {        return $this->responseCode;    }}
~~~~

</p>

And here's how you use it

<p>
~~~~ {.php name="code"}
try {    $login = new GoogleClientLogin( '[username]@gmail.com', '[password]', GoogleClientLogin::$SPREADSHEET_SERVICE, '[identifier]');    echo $login->getAuth();    echo $login->getResponseCode();}catch(LoginFailedException $e) {    echo 'Login Failed:  ' . $e->getMessage();}catch(Exception $e) {    echo 'Error occurred:  ' . $e->getMessage();}
~~~~

</p>

**<identifier\>** is just some string that identifies your app,
presumably so Google can cut down on abuse.

  [Authentication for Installed Applications]: http://code.google.com/apis/accounts/docs/AuthForInstalledApps.html
