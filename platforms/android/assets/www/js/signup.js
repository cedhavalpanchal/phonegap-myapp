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
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        $("#signup").click(function() {
            
            $("#reg_form").validate({
                rules: {
                    fullname: {
                        required: true,
                        accept: "[a-zA-Z]+"
                    }, // simple rule, converted to {required:true}
                    email: {// compound rule
                        required: true,
                        email: true
                    },
                    password: "required"
                },
                messages: {
                    fullname: {
                        required: "Please enter a your name.",
                        accept: "please enter valid name"
                    },
                    email: {
                        required: "please enter your email",
                        email: "please enter valid email"
                    },
                    password: "please enter password"
                },
                submitHandler: function() {
                    var fullname = $("#fullname").val();
                    var email = $("#email").val();
                    var password = $("#password").val();
                    var dataString = "fullname=" + fullname + "&email=" + email + "&password=" + password;
                    $.ajax({
                        type: "POST",
                        url: "http://localhost/phonegap/signup.php",
                        data: dataString,
                        crossDomain: true,
                        cache: false,
                        beforeSend: function() {
                            $("#signup").val('Connecting...');
                        },
                        success: function(data) {
                            console.log(data);
                            $("#signup").val('Register');
                            $("#reg_form").trigger('reset');
                            if (data == "success")
                            {
                                alert("Thank you for Registering with us! you can login now");
                            }
                            else if (data = "exist")
                            {
                                alert("Hey! You alreay has account! you can login with us");
                            }
                            else if (data = "failed")
                            {
                                alert("Something Went wrong");
                            }
                        }
                    });
                }
            });
        });
    }
};




