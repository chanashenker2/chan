appMdl.controller('clockCtrl', ['$scope','$filter', function ($scope,$filter) {

    $scope.arr = [];
    $scope.error;
    $scope.hoursSummary = 0;
   
   //function to save enter or exit
    $scope.saveEnterOrExit = function (enterTime) {     
        if ($scope.Enter == true) {
            localStorage[localStorage.length + 1] = JSON.stringify({ date: new Date(), Time: enterTime, status: $scope.Enter });
            $scope.Enter = null;
            $scope.isEnter = false;
            $scope.Exit = true;
            $scope.startTime = new Date(enterTime).getHours();
         }
        else {
          
            $scope.exitTime = new Date(enterTime).getHours();

            if (($scope.startTime > 12 && $scope.startTime <= 23) && ($scope.exitTime >= 0 && $scope.exitTime < 12))
                $scope.exitTime += 24;
                $scope.SumHours = $scope.exitTime - $scope.startTime;
            if ($scope.SumHours < 0)
            {
                $scope.error = true;
            }
            else {
                localStorage[localStorage.length + 1] = JSON.stringify({ date: new Date(), Time: enterTime, status: $scope.Enter });
                $scope.isEnter = false;
                $scope.Exit = false;
                $scope.Enter = false;
                $scope.error=false;
            }
            }
    }

    $scope.search = "";
    //$scope.func = function () {
    //    $scope.ezArr = [];
       
    //    for (var i = 0; i < $scope.arr.length; i++) {
            
    //        $scope.ezArr.push({ date: new Date($scope.arr[i].date), Time: $scope.arr[i].Time, status: $scope.arr[i].status });
    //          $scope.list=angular.copy($scope.ezArr);
    //    }
    //}
    //go back
    $scope.out = function () { 
        if ($scope.Enter == true) {
            $scope.isEnter = false;
        }
        else {
            $scope.isEnter = false;
        }
    }
    $scope.TableLoad = function () {//load the table
        $scope.hoursSummary = 0;
        $scope.arr = [];
         //$scope.arr.push({ date: new Date("2015/03/03"), Time: "10:00", status: "enter" });//example for search
         for (var i = 1; i <= localStorage.length; i++) {
            var x = localStorage[i];
            var p = JSON.parse(x);
            if (p.status == true)
                var currentStatus = "enter";
            else var currentStatus = "exit";
            $scope.arr.push({ date: p.date, Time: p.Time, status: currentStatus });
        }
           $scope.array = angular.copy($scope.arr);
           for (var i = 1, j = 0; i <= localStorage.length - 1; i += 2, j++) {
               var text = localStorage[i];
               var p = JSON.parse(text);
               var en = new Date(p.Time).getHours();
               text = localStorage[i + 1];
               p = JSON.parse(text);
               var ex = new Date(p.Time).getHours();
            if ((en > 12 &&en <= 23) && (ex >= 0 && ex < 12))
                ex += 24;
            $scope.hoursSummary += (ex - en);
        }

           $scope.ezArr = [];

           for (var i = 0; i < $scope.arr.length; i++) {

               $scope.ezArr.push({ date: new Date($scope.arr[i].date), Time: $scope.arr[i].Time, status: $scope.arr[i].status });
               $scope.list = angular.copy($scope.ezArr);
           }

    }
    var string;
    $scope.filter = function () {
        
        angular.forEach($scope.ezArr, function (item) {
             string = "" + item.date;
            item.Month = string.split(" ")[1]; 
          });
        if ($scope.search != "")
            $scope.ezArr = $filter('filter')($scope.ezArr, { Month: $scope.search });
        else {
            $scope.ezArr = [];
            string = "";
            $scope.ezArr = angular.copy($scope.list);
             }
        
    }
   



}]);
