/*
 * 开始获取第一页的数据
 */

ajaxPage();

function ajaxPage() {
	$.ajax({
		type : "POST",
		url : "",
		dataType : "json",
		//传number的目的是为了让后台判断传哪些数据
		data : {
			number : $(".active a").html(),
		},
		success : function(data) {	
			if (data.success) {
				//成功后加载数据 传10个数据
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
					//如果数据传过来大于十个，那么就只能显示10个
					if (oShow.length > 10) {
						oShow.length == 10;
					}
					var listContent = new String("");
					for (var i = 0 ; i < oShow.length ; i++) {
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
				} else {
					$("tbody").html("出现错误："+data.msg);
				}			
			},
		error:function(jqXHR) {
			alert("发生错误："+jqXHR.status);
		}
	});
};

function ajaxSearch(val) {
	$.ajax({
	type : "POST",
	url : "",
	dataType : "json",
	//传number的目的是为了让后台判断传哪些数据
	data : {
		value : val,
	},
	success : function(data) {	
		if (data.success) {
			//成功后加载数据 传10个数据
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
				  },
				  {
				    name : "win11",
				    src : "http://www."
				  }
				];
				var oShow = list_show;
				var listLength = oShow.length;
				var listLengthPage = oShow.length;
				if(listLength > 10) {
					listLength = 10;
				}
				var listContent = new String("");
				for (var i = 0 ; i < listLength ; i++) {
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
				//为列表添加分页
				var pageNumber = Math.ceil(listLengthPage / 10);
				if( pageNumber > 8) {
					pageNumber = 8;
				}
				var pageLi = new String("");
				pageLi += '<li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>';
				for(var i = 0; i < pageNumber; i++) {
					pageLi += '<li class="active"><a href="#!">' + (i+1) + '</a></li>';
				}
				pageLi += '<li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>';
				$(".pagination").html(pageLi);
			}
		} else {
			$("tbody").html("出现错误："+data.msg);
		}			
	},
	error:function(jqXHR) {
		alert("发生错误："+jqXHR.status);
	}
	});
}
//当点击的时候向后台请求数据 页面加载后
$(document).ready(function(){
	//搜索,向后台发出请求
	$(".input_area i").click(function() {
		var searchContent = $(".input_area input").val();
		//搜索内容不为空
		if (searchContent != "") {
			ajaxSearch(searchContent);
	  	}
	});

	var paginationLi = $(".pagination li");
	var paginationLiFirstChild = $(".pagination li:first-child");
	var paginationLiLastChild = $(".pagination li:last-child");

	for (var i = 1; i < paginationLi.length - 1; i++) {
		paginationLi[i].onclick = function() {
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			$(this).find("a").html() == 1 ? $(paginationLiFirstChild).addClass("disabled") : $(paginationLiFirstChild).removeClass("disabled");
			$(this).find("a").html() == 8 ? $(paginationLiLastChild).addClass("disabled") : $(paginationLiLastChild).removeClass("disabled");
			ajaxPage();	
		}
	}
	$(paginationLiFirstChild).click(function() {
		var activePrev = $(".pagination li.active");
		var activeNextA = $(".pagination li.active a");

		if ($(activeNextA).html() > 1) {
			if ($(activeNextA.html() != 8)) {
				$(paginationLiLastChild).removeClass("disabled");
			}
			$(this).removeClass("disabled");
			$(activePrev).prev().addClass("active");
			$(activePrev).removeClass("active");
			if ($(activeNextA).html() == 2) {
				$(this).addClass("disabled");
			}
		}
		//ajaxPage();

	});

	$(paginationLiLastChild).click(function() {
		var activeNext = $(".pagination li.active");
		var activeNextA = $(".pagination li.active a");

		if ($(activeNextA).html() < 8) {
			if ($(activeNextA.html() != 1)) {
				$(paginationLiFirstChild).removeClass("disabled");
			}
			$(this).removeClass("disabled");
			$(".pagination li.active").next().addClass("active");
			$(activeNext).removeClass("active");
			if ($(activeNextA).html() == 7) {
				$(this).addClass("disabled");
			}
		}
		ajaxPage();							
	});
});
 
