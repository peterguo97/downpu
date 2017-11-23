$(document).ready(function(){
	
	listShow();

	//展示list
	function listShow(list_show) {
		//list in page
		list_show = [
		  {
		    name : "win7",
		    src : "http://www."
		  },
		  {
		    name : "win10",
		    src : "http://www."
		  }
		];
		var oShow = list_show;
		var listContent = new String("");
		for (var i = 0 ; i < 2 ; i++) {
			listContent += '<tr>' ;
			listContent += '<td>' + oShow[i].name + '</td>';
			listContent += '<td>'+ oShow[i].src + '</td>';
			listContent += '<td>' + '<a class="btn" href="#">' + '修改' + '</a>'
							  + '<a class="waves-effect waves-light btn modal-trigger red deleteList" href="#modal1">' + '删除' + '</a>'
							  + '<div class="modal">' 
							  	+ '<div class="modal-content">' 
							  		+ '<h4>' + '删除列表框' + '</h4>'
							  	+ '</div>'
							  	+ '<div class="modal-footer">'
							  		+ '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">' + '取消' + '</a>'
							  		+ '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat removeList">' + '同意' + '</a>'
							  	+ '</div>'
							  + '</div>'
					+ '</td>';
			listContent += '</tr>';
		};
		$("tbody").html(listContent);
	}

	//处理列表
	var removeList = document.getElementsByClassName("removeList");
	var oTbody = document.getElementsByTagName("tbody")[0];
	var oTr = oTbody.getElementsByTagName("tr");
	var deleteList = document.getElementsByClassName("deleteList");

	for (var i = 0; i < deleteList.length; i++) {  
		deleteList[i].index = i;
		deleteList[i].onclick = function() {
		    var _this = this;    
		    _this.nextElementSibling.id = "modal1";
		    var model1 = document.getElementById("modal1");
		    var aList = model1.getElementsByTagName("a");
		    aList[1].onclick = function() {
		      //ajax 传后台Name and Src
		      $.ajax({
		        type: "POST",
		        url: "",
		        dataType: "json",
		        data: {
		          name: $(_this).parent().prev().prev().html(),
		          src: $(_this).parent().prev().html()
		        },
		        success: function(data) { 
		          if(data.success) {
		            oTbody.removeChild(_this.parentNode.parentNode);
		          } else {
		          }     
		        },
		        error: function(jqXHR) {
		          alert("发生错误："+jqXHR.status);
		        }
		      });
		    };
		    aList[0].onclick = function() {
		      _this.nextElementSibling.id = "";
		    };
		};
	}
});
