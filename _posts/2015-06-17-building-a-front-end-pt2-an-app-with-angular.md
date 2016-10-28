---
layout: post
type: post
title: "Building a Front-End, pt.2"
description: "An App with AngularJS and our RESTful HTTPServlet"
category: xpages-servlets
series: servlet-series
tags: [xpages, domino, javascript, servlet, angularjs]
modified: 2015-06-17
comments: true
share: true
---

{% include series.html %}
### Ever Onward
For as much theory and verbiage as yesterday's post was, today's will be primarily code-driven; something I hope you're ready for. I'll run through this all and hopefully I can illustrate succinctly as we go.

{% include toc.html %}
<!--
### Let's Do It!
-app as SPA (why an SPA?)
-handling routing to relate to your data (HATEOAS) with $resource
-controllers for controlled logic
-binding, directives, filters
-what to do with that data
-CRUD (vs my client use in Ni9: http://www.notesin9.com/2015/04/09/notesin9-173-getting-started-with-servlets/)
-->

### HTML Templating
HTML templating is useful because it frames out the structure of a page, in its components parts, and, possibly the most useful attribute, it can be cached by the browser. This is highly useful for a lot of traffic and saves on the overhead of transporting markup with your data in every update of data. It's one of the topics Marky Roden talked about during his [5 Questions with Marky Roden](//www.youtube.com/watch?v=k5bDvZg4Gbg) video for SocialBizUG.org.

The initial page for the Houses of AnAppOfIceAndFire (_index.html_) is laid out like almost anyone would expect an _index.html_ file that implements Bootstrap. I've snipped out everything but the &lt;body&gt; tag contents for space.

```html
<!-- ...head contents... -->

<!-- defining where to inject our app definition, using the body tag -->
<body ng-app="houseApp">
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
        <!-- ...navbar contents... -->
    </div>

    <!-- the magic! -->
    <div ui-view></div>

    <!-- CDN driven resources for Bootstrap and AngularJS JS resource files -->
    <script type="text/javascript" src="js/houseApp.js"></script>
</body>
<!-- ... -->
```

The "magic happens" part is where my application code structures in the HTML partials, which I route in, based on my config. We'll get there in a minute, for now, have a look at the two partial HTML files I'm using, one for the collection list and one for the individual house. You may notice that I'm also nesting my House Record inside the House Collection partial, this is one of the nifty features I like about ui-router.

**House Collection**

```html
<div id="uiContainer" class="container">
    <div class="row">
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Houses of the Seven Kingdoms of Westeros</h3>
                </div>
                <ul class="list-group list-group-striped">
                    <li class="list-group-item"
                        ng-repeat="house in housesOfWesteros | startFrom : curPage*pageQty | limitTo:pageQty">
                        <a ng-href="#/houses/{{ house.unid }}" title="{{ house.unid }}">{{house.name}}</a>
                        <a href="#"
                            class="btn btn-danger pull-right"
                            ng-really-message="Are you sure you want to delete this house from Westeros?"
                            ng-really-click="removeHouse(house.unid)"><i class="fa fa-lg fa-trash-o"></i></a>
                        <br />{{house.words}}
                    </li>
                </ul>
                <div class="panel-footer col-xs-12">
                    <nav>
                        <ul class="pager">
                            <li class="previous" ng-class="{'disabled': curPage == 0}">
                                <a ng-click="curPage = curPage - 1" href=""><span aria-hidden="true">&larr;</span> Previous</a>
                            </li>
                            <span ng-bind="(curPage+1) + '/' + numberOfPages()"></span>
                            <li class="next" ng-class="{'disabled': curPage >= housesOfWesteros.length/pageQty-1}">
                                <a ng-click="curPage = curPage + 1" href="">Next <span aria-hidden="true">&rarr;</span></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <!-- single house content -->
        <div ui-view class="col-md-6 col-md-offset-2"></div>
    </div>
</div>
```

**House Record**
For obvious reasons, much more like a form.

```html
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">House Details</h3>
    </div>
  <div class="panel-body">
      <form name="houseForm">
        <div class="form-group">
        <label
          for="houseName">
          Name</label>
        <input
          type="text"
          class="form-control"
          id="houseName"
          name="name"
          ng-model="myHouse.name"
          ng-disabled="!editForm" />
      </div>
      <div class="form-group">
        <label
          for="houseDescription">
          Description</label>
        <textarea
          class="form-control"
          id="houseDescription"
          name="description"
          ng-model="myHouse.description"
          rows="3"
          ng-disabled="!editForm" />
      </div>
      <div class="form-group">
        <label
          for="coatOfArms">
          Coat of Arms</label>
        <input
          type="text"
          class="form-control"
          id="coatOfArms"
          name="coatOfArms"
          ng-model="myHouse.coatOfArms"
          ng-disabled="!editForm" />
      </div>
      <div class="form-group">
        <label
          for="houseWords">
          Words</label>
        <input
          type="text"
          class="form-control"
          id="houseWords"
          name="words"
          ng-model="myHouse.words"
          ng-disabled="!editForm" />
      </div>
      <div class="form-group">
        <label
          for="houseSeat">
          Seat</label>
        <input
          type="text"
          class="form-control"
          id="houseSeat"
          name="seat"
          ng-model="myHouse.seat"
          ng-disabled="!editForm" />
      </div>
      <div class="form-group">
        <label
          for="houseCurrentLord">
          Current Lord</label>
        <input
          type="text"
          class="form-control"
          id="houseCurrentLord"
          name="currentLord"
          ng-model="myHouse.currentLord"
          ng-disabled="!editForm" />
      </div>
      <div class="form-group">
        <label
          for="houseRegion">
          Region</label>
        <input
          type="text"
          class="form-control"
          id="houseRegion"
          name="region"
          ng-model="myHouse.region"
          ng-disabled="!editForm" />
      </div>
      <div class="form-group">
        <label
          for="houseTitle">
          Title</label>
        <input
          type="text"
          class="form-control"
          id="houseTitle"
          name="title"
          ng-model="myHouse.title"
          ng-disabled="!editForm" />
      </div>
      <div class="form-group">
        <label
          for="houseHeir">
          Heir</label>
        <input
          type="text"
          class="form-control"
          id="houseHeir"
          name="heir"
          ng-model="myHouse.heir"
          ng-disabled="!editForm" />
      </div>
      <div class="form-group">
        <label
          for="houseOverlord">
          Overlord</label>
        <input
          type="text"
          class="form-control"
          id="houseOverlord"
          name="overlord"
          ng-model="myHouse.overlord"
          ng-disabled="!editForm" />
      </div>
      <div class="btn-list pull-right">
        <button
          class="btn-default btn"
          type="button" id="buttonCancelGotHouse"
          ng-really-message="Are you sure?"
          ng-really-click="clearCancelForm()">
          <i class="fa fa-lg fa-pencil"></i> Cancel</button>
        <button
          class="btn-success btn"
          type="button" id="buttonSaveGotHouse"
          ng-show="editForm"
          ng-click="saveHouseForm()">
          <i class="fa fa-lg fa-save"></i> Save</button>
        <button
          class="btn-primary btn"
          type="button" id="buttonEditGotHouse"
          ng-disabled="!canEditForm"
          ng-show="!editForm"
          ng-click="setFormEditable()">
          <i class="fa fa-lg fa-pencil"></i> Edit</button>
      </div>
    </form>
  </div>
    <!-- <div class="panel-footer col-xs-12"></div> -->
</div>
```

### AngularJS App

##### 0 - Structure
My app will consist of a few parts. I've broken them apart here into sections, for ease of reading. I've also taken the approach for my app.js of chain-loading each section off the main module definition, decreasing the number of handles for the same object.

##### 1 - Config
I'll first need to configure any routing rules for my HTML partials and resolving URL route parameters as their respective variables; this will happen [in the config](//docs.angularjs.org/guide/module); the definition is for an Angular "module". Any 3rd party assets get plugged in here, as part of the dependency injection, such as [ui-router](https://github.com/angular-ui/ui-router).

```javascript
// a self-invoking, anonymouse function to keep application code variables scoped anonymously
(function(){

  //defines the AngularJS app as a module
  angular.module('houseApp', ['ui.router']) //'ngAnimate'

  //ui-router config
  .config(
    function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/houses');

      $stateProvider
        .state('houses', {
          url: '/houses',
          templateUrl: 'partials/houseList.html',
          controller: 'HouseListCtrl'
        })
        .state('houses.item', {
          url: '/:item',
          templateUrl: 'partials/house.html',
          controller: 'OneHouseCtrl'
        });
  })

  // ... services/factories, controllers, filters, directives

})();
```

##### 2 - Services/Factories
Any [services or factories (or providers)](//docs.angularjs.org/guide/services) get defined here.

```javascript
//...config...
/*
 *  Factories
 */

//defines the $HTTP factory, one of the 3 service types
.factory('houseCollectionFactory', [ '$http', function($http) {
  return $http( {
    method : 'GET',
    url : 'houses'
  });
} ])

.factory('houseFactory', [ '$http', function($http){
  return function(id){
    return $http( {
      method : 'GET',
      url : 'houses/'+id
    });
  }
}])
//...controllers,filters,directives...
```

##### 3 - Controllers
[Controllers](//docs.angularjs.org/guide/controller) are a binding of functional behavior to sections of the HTML. I have two controllers, each with different scopes. Mine are for my navigation handling and the primary application regarding houses.

```javascript
//...config,factories...
/*
 *  Controllers
 */

//navigation controller
.controller('NavCtrl', function($scope, $location){
  $scope.isActive = function(route) {
      return route === $location.path();
    }
})

//provies the controller to the app, which handles the interaction of data (model) with the view (a la MVC)
.controller('HouseListCtrl', function($scope, $state, $http, $filter, houseCollectionFactory) {

  //defines filter/search/etc. vars
  $scope.pageQty = 5; //detectPhone() ? 10 : 30;
  $scope.curPage = 0;

  //calculates the number of results
  $scope.numberOfPages = function() {
    return Math.ceil($scope.housesOfWesteros.length / $scope.pageQty) || 0;
  }

  //defines a boolean var
  $scope.showSearch = false;

  $scope.housesOfWesteros = [];
  //the factory is returning the promise of the $http, so handle success/error here
  houseCollectionFactory
    .success( function(data, status, headers, config) {
      $scope.housesOfWesteros = data;
      //$scope.predicate = "JobNum";
      //$scope.reverse = false;
    }).error( function(data, status, headers, config) {
      $scope.housesOfWesteros = null;
      console.log("data: " + data);
      console.log("status: " + status);
      console.log("headers: " + headers);
      console.log("config: " + JSON.parse(config));
    })
     .then( function(){
      //angular.element('div.screenMask').css('visibility','hidden');
    });

  $scope.removeHouse = function(unid){
    $http( {
      method : 'DELETE',
      url : 'houses/'+unid
    })
    .success( function(data, status, headers, config){
      console.log("successfully deleted house with id: "+unid);
    })
    .error( function(data, status, headers, config){
      //might as well say something
      console.log("poop");
    })
    .then( function(){
      $state.go('houses',{reload: true});
    });
  };

})

.controller('OneHouseCtrl', function($scope, $state, $stateParams, $http, houseFactory){
  // check for empty ID
  var tmpItm = $stateParams.item;
  console.log("unid: "+tmpItm);
  var re = /^[0-9A-Za-z]{32}$/;
  //var re = /\d/;
  if( tmpItm == null || tmpItm == undefined || (!tmpItm || !tmpItm.trim()) || !re.test(tmpItm) ){
    $state.go('houses');
  }

  $scope.editForm = false;
  $scope.canEditForm = false;
  $scope.myHouse = {};
  var fieldNames = [];
  houseFactory($stateParams.item)
    .success(function(data, status, headers, config) {
      $scope.myHouse = data;
      $scope.canEditForm = true;
      angular.forEach($scope.myHouse,function(value,key){
        if( key!="unid" ){
          fieldNames.push(key);
        }
      });
    })
    .error(function(data, status, headers, config) {
      console.log("status: "+status);
      console.log("data: "+data);
      console.log("headers: "+headers);
      console.log("config: "+JSON.parse(config));
    });
  $scope.setFormEditable = function() {
    if( $scope.canEditForm == true ){
      $scope.editForm = true;
    }
  }
  $scope.clearCancelForm = function() {
    $state.go('houses');
  }

  $scope.saveHouseForm = function(){
    var tmpOb = { "unid": $scope.myHouse.unid };
    //console.log("checking field names: "+fieldNames.toString());
    angular.forEach(fieldNames, function(fldNm){
      if( $scope.houseForm[fldNm].$dirty === true ){
        var tmpVal = $scope.myHouse[fldNm];
        //console.log("updated field: "+fldNm+" with value: "+tmpVal);
        tmpOb[fldNm] = tmpVal;
      }
    });

    $http( {
      method : 'PUT',
      url : 'houses/'+$scope.myHouse.unid,
      data: JSON.stringify(tmpOb)
    })
      .success( function(data, status, headers, config){
        console.log("successfully updated house with unid: "+$scope.myHouse.unid);
      })
      .error( function(data, status, headers, config){
        //might as well say something
        console.log("poop");
      })
      .then( function(){
        $state.go('houses',{reload: true});
      });

    //console.log("Simulated PUT complete with object to send: "+JSON.stringify(tmpOb));
  }

})
//...filters,directives...
```

##### 4 - Filters
Everyone tends to like directives in AngularJS (I do too), but one of my favorite aspects of AngularJS is the [out-of-the-box Filters](//docs.angularjs.org/guide/filter) that we get for free. This is an entire subject on its own IMO, but for now, you can see my "startFrom" custom filter; part of my custom paging mechanism for the House Collection.

```javascript
//...config,factories,controllers...
/*
 *  Filters
 */

// we already use the limitTo filter built-in to AngularJS,
// this is a custom filter for startFrom
.filter('startFrom', function() {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
})
//...directives...
```

##### 5 - Directives
[Directives](//docs.angularjs.org/guide/directive) are the higher level "do something" definitions. Most of the AngularJS attributes or tags you write into HTML are directives. As with Filters, you can write your own Directives all you like, but some of the most useful ones come OoB ("out of the box").

```javascript
//...config,factories,controllers,filters
/*
 *  Directives
 */

//This directive allows us to pass a function in on an enter key to do what we want.
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})

/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 */
.directive('ngReallyClick', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    }
}]);
//...nothing, just close the parenthesis to make the JS object complete then invoke with another set of paren
```

### Bring It Home
That's basically it. I find that once you isolate what elements of work you have, the pieces don't have to be ugly or scary. In fact, the craziest part of my whole app was defining my clear/cancel and save functions in my House Record Controller, and that was fairly easy.

You can clone my Git repository and play around with it yourself, if you like. <span data-toggle="tooltip" title="why wouldn't I recommend that?">I recommend following the build instructions in the ReadMe included there</span>. Until next time, 🍺.

<amp-iframe
  width="160"
  height="30"
  layout="fixed"
  sandbox="allow-scripts allow-same-origin allow-popups"
  frameborder="0"
  src="https://ghbtns.com/github-btn.html?user=edm00se&repo=AnAppOfIceAndFire&type=star&count=true&size=large&v=2">
</amp-iframe>

<amp-iframe
  width="160"
  height="30"
  layout="fixed"
  sandbox="allow-scripts allow-same-origin allow-popups"
  frameborder="0"
  src="https://ghbtns.com/github-btn.html?user=edm00se&repo=AnAppOfIceAndFire&type=fork&count=true&size=large&v=2">
</amp-iframe>
