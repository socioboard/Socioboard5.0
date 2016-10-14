﻿'use strict';

SocioboardApp.controller('DiscoveryController', function ($rootScope, $scope, $http, $timeout, apiDomain) {
   
    $scope.$on('$viewContentLoaded', function () {
        discovery();
        smartsearch();
        $scope.dispbtn = true;
        $scope.dispbtnsmart = true;



         $scope.ComposeMessage = function () {
                $scope.dispbtn = false;
                var profiles = $('#composeProfiles').val();
                var message = $('#composeMessage').val();
                var updatedmessage = "";
                var postdata = message.split("\n");
                for (var i = 0; i < postdata.length; i++) {
                    updatedmessage = updatedmessage + "<br>" + postdata[i];
                }
                updatedmessage = updatedmessage.replace(/#+/g, 'hhh');
                if (profiles.length > 0 && message!='') {
                    $scope.checkfile();
                    if ($scope.check == true) {
                        var formData = new FormData();
                        formData.append('files', $("#composeImage").get(0).files[0]);
                        $http({
                            method: 'POST',
                            url: apiDomain + '/api/SocialMessages/ComposeMessage?profileId=' + profiles + '&userId=' + $rootScope.user.Id + '&message=' + updatedmessage,
                            data: formData,
                            headers: {
                                'Content-Type': undefined
                            },
                            transformRequest: angular.identity,
                        }).then(function (response) {
                            if (response.data == "Posted") {
                                $scope.dispbtn = true;
                                $('#ComposePost').closeModal();
                                swal('Message compose successfully');
                            }

                        }, function (reason) {
                            console.log(reason);
                        });
                    }
                    else {
                        alertify.set({ delay: 3000 });
                        alertify.error("File Extention is not valid. Please upload any image file");
                        $('#input-file-now').val('');
                    }
                }
                else {
                    $scope.dispbtn = true;
                    swal('please select profile and type message for compose');
                }
            }

            $scope.checkfile = function () {
                var filesinput = $('#composeImage');
                var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
                if (filesinput != undefined && filesinput[0].files[0] != null) {
                    if ($scope.hasExtension('#composeImage', fileExtension)) {
                        $scope.check = true;
                    }
                    else {

                        $scope.check = false;
                    }
                }
                else
                {
                    $scope.check = true;
                }
            }
            $scope.hasExtension = function (inputID, exts) {
                var fileName = $('#composeImage').val();
                return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
            }



        $scope.DiscoverySearchTwitter = function () {
            //codes to load twitter discovery start
            $http.post(apiDomain + '/api/Discovery/DiscoverySearchTwitter?groupId=' + $rootScope.groupId + '&userId=' + $rootScope.user.Id + '&keyword=' + $scope.searchText)
                          .then(function (response) {
                              $scope.dispbtn = true;
                              $scope.SearchTwitterdate(response.data);
                          }, function (reason) {
                              $scope.error = reason.data;
                          });
            // end codes to load twitter discovery

        }
        $scope.DiscoverySearchinstagram = function () {
            //codes to load twitter discovery start
            $http.post(apiDomain + '/api/Discovery/DiscoverySearchinstagram?groupId=' + $rootScope.groupId + '&userId=' + $rootScope.user.Id + '&keyword=' + $scope.searchText)
                          .then(function (response) {
                              $scope.dispbtn = true;
                              $scope.Searchinstagramdate(response.data);
                          }, function (reason) {
                              $scope.error = reason.data;
                          });
            // end codes to load twitter discovery

        }
        $scope.DiscoverySearchGplus = function () {
            //codes to load gplus discovery start
            $http.post(apiDomain + '/api/Discovery/DiscoverySearchGplus?groupId=' + $rootScope.groupId + '&userId=' + $rootScope.user.Id + '&keyword=' + $scope.searchText)
                          .then(function (response) {
                              $scope.dispbtn = true;
                              $scope.SearchGplusdate(response.data);
                          }, function (reason) {
                              $scope.error = reason.data;
                          });
            // end codes to load gplus discovery

        }
         $scope.DiscoveryHistory= function()
        {
            //codes to load discovery historys start
            $http.post(apiDomain + '/api/Discovery/DiscoveryHistory?userId=' + $rootScope.user.Id)
                          .then(function (response) {
                              $scope.dispbtn = true;
                              $scope.DiscoveryHistory=response.data;
                          }, function (reason) {
                              $scope.error = reason.data;
                          });
            // end codes to load discovery historys 
        }
        $scope.discovery = function (SearchKeyword)
        {
            if (SearchKeyword != undefined) {
                $scope.searchText = SearchKeyword;

            }
            else {
                $scope.searchText = $('#discoverytext').val();
            }
            if ($scope.searchText != '') {
                $scope.dispbtn = false;
                $scope.DiscoverySearchGplus();
                $scope.DiscoverySearchTwitter();
                 $scope.DiscoverySearchinstagram();
                 $('#discoverytext').val('');
                 $scope.DiscoveryHistory();
                 
            }
            else
            {
                $scope.dispbtn = true;
                swal('enter any keyword for search');
            }
        }

        $scope.SearchGplusdate = function (parm) {

            for (var i = 0; i < parm.length; i++) {
                var date = moment(parm[i].createdTime);
                var newdate = date.toString();
                var splitdate = newdate.split(" ");
                date = splitdate[0] + " " + splitdate[1] + " " + splitdate[2] + " " + splitdate[3];
                parm[i].createdTime = date;
            }
            $scope.lstDiscoverySearchGplus = parm;

        }

        $scope.Searchinstagramdate = function (parm) {

            for (var i = 0; i < parm.length; i++) {
                var date = moment(parm[i].FeedDate);
                var newdate = date.toString();
                var splitdate = newdate.split(" ");
                date = splitdate[0] + " " + splitdate[1] + " " + splitdate[2] + " " + splitdate[3];
                parm[i].feedDate = date;
            }
            $scope.lstDiscoverySearchinstagram = parm;

        }

        $scope.SearchTwitterdate = function (parm) {

            for (var i = 0; i < parm.length; i++) {
                var date = moment(parm[i].createdTime);
                var newdate = date.toString();
                var splitdate = newdate.split(" ");
                date = splitdate[0] + " " + splitdate[1] + " " + splitdate[2] + " " + splitdate[3];
                parm[i].createdTime = date;
            }
            $scope.lstDiscoverySearchTwitter = parm;

        }

       
        
        $scope.DiscoveryHistory();
        /* start code for discovery smart serch*/
        $scope.DiscoverySmartSearch=function()
        {
            var address = $("#search_location").val();
            var radius = $("#radius-select").val();
            var type = $("#type-select").val();
            var typ = "";
            var rds = "";
            if (type == "1")
            { typ = "mi"; } else { typ = "km"; }
            rds = radius;
            var geoLocation = "";
            var lat = "";
            var lng = "";

            var keyword = $('#txtsearch').val();
            if (keyword == "") {
                $scope.dispbtnsmart = true;
                return;
            }

            if (address == "" || address == null || address == undefined) {
                $scope.dispbtnsmart = false;
                $http.post(apiDomain + '/api/Discovery/TwitterTweetSearchWithGeoLocation?searchkeyword=' + keyword + "&geoLocation=" + geoLocation)
                          .then(function (response) {
                              $("#search_location").val('');
                              $('#txtsearch').val('');
                              $scope.dispbtnsmart = true;
                              $scope.SearchTwitterSmartSearchdate(response.data);
                          }, function (reason) {
                              $scope.error = reason.data;
                          });
            } else {
                $scope.dispbtnsmart = false;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': address }, function (results, status) {
                    var location = results[0].geometry.location;
                    lat = location.lat();
                    lng = location.lng();
                    geoLocation = lat + ',' + lng + ',' + rds + typ;
                    $http.post(apiDomain + '/api/Discovery/TwitterTweetSearchWithGeoLocation?searchkeyword=' + keyword + "&geoLocation=" + geoLocation)
                         .then(function (response) {
                             $("#search_location").val('');
                             $('#txtsearch').val('');
                             $scope.dispbtnsmart = true;
                             $scope.SearchTwitterSmartSearchdate(response.data);
                         }, function (reason) {
                             $scope.error = reason.data;
                         });
                });

            }
        }



        $scope.SearchTwitterSmartSearchdate = function (parm) {

            for (var i = 0; i < parm.length; i++) {
                var date = moment(parm[i].CreatedTime);
                var newdate = date.toString();
                var splitdate = newdate.split(" ");
                date = splitdate[0] + " " + splitdate[1] + " " + splitdate[2] + " " + splitdate[3];
                parm[i].CreatedTime = date;
            }
            $scope.lstDiscoveryGeoLocation = parm;

        }
        /* end code for discovery smart serch*/
    });
  
});