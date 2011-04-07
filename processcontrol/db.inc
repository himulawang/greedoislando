<?php

class db {
    private $host = 'localhost', $password = '', $user = '', $db = '';
    function __construct() {
        $this->src = mysql_connect($this->host, $this->user, $this->password);
        mysql_select_db($this->db, $this->src);
    }
    function escape($v) {
        return mysql_real_escape_string($v);
    }
    function query($query) {
        $this->result = mysql_query($query, $this->src);
        return $this->result;
    }
    function rows() {
        return mysql_num_rows($this->result);
    }
    function fetch() {
        $this->row = mysql_fetch_assoc($this->result);
        return $this->row;
    }

}

