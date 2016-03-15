/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
// Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
    }
    ,
    // deviceready Event Handler
    onDeviceReady: function() {
        $("#login").click(function() {
            var email = $("#email").val();
            var password = $("#password").val();
            var dataString = "email=" + email + "&password=" + password;
            
            if ($.trim(email).length > 0 & $.trim(password).length > 0)
            {
                $.ajax({
                    type: "POST",
                    url: "http://localhost/phonegap/login.php",
                    data: dataString,
                    crossDomain: true,
                    cache: false,
                    beforeSend: function() {
                        $("#login").html('Connecting...');
                    },
                    success: function(data) {
                        console.log(data);
                        if (data == "success")
                        {
                            localStorage.login = "true";
                            localStorage.email = email;
                            window.location.href = "index.html";
                        }
                        else if (data = "failed")
                        {
                            alert("Login error");
                            $("#login").html('Login');
                        }
                    }
                });
            }
            return false;
        });
    }
};
