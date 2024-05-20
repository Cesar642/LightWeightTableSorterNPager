/*
 *
 * lightwSorted - Client-side table sorting light weight
 * Version 1.0.0
 * @requires jQuery v1.3.2 +
 *
 * Copyright (c) 2010 Cesar Rodriguez Olvera
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * modified to allow to show pop up
 *
 */
(function($) {

    $.fn.lighttablesorter = function(settings) {
        var options = {
            'sortList': [],
            'widget': 'zebra',
            'pageSize': 10,
            'pageable': null
        };

        var nrows;
        var ncolumns;
        var config = $.extend(options, settings);
        var bodieChild;
        var headerChild;
        var headers;
        var bodies;
        var typeDataFunction = typeData;
        var sortFunction = sortRows;
        var setSize = sizePage;
        var movePage = move;
        var currentPage = 1;
        var container = null;

        this.each(function() {
            if(!this.tHead || !this.tBodies) return;
            headers = this.tHead;
            bodies = this.tBodies;
            bodieChild = $(bodies).children();
            headerChild = $(headers).children('#sortableHeader').children();
            nrows = bodieChild.length;
            ncolumns = headerChild.length;
            container = config.pageable;
            if(container != null){
                setSize(currentPage,config.pageSize);
            }
            $(headerChild).addClass('header');
            headerChild.unbind('click').click(function (){
                $(headerChild).removeClass().addClass('header');
                var elem = $(this);
                var ind = headerChild.index(this);
                if(elem.data('sorted') == 'asc'){
                    sortFunction(ind,1);
                    elem.data('sorted','desc');
                    elem.addClass('desc');
                }
                else{
                    sortFunction(ind,0);
                    headerChild.data('sorted','undefined');
                    elem.data('sorted','asc');
                    elem.addClass('asc');
                }
                bodieChild = $(bodies).children();
                if(container != null){
                    setSize(currentPage,config.pageSize);
                }
                activateHover();
            });
            $(container).find('#next').unbind('click').click(function(){
                movePage(1);
                
            });
            $(container).find('#prev').unbind('click').click(function(){
                movePage(-1);
                
            });
            $(container).find('#last').unbind('click').click(function(){
                movePage(1,true);
                
            });
            $(container).find('#first').unbind('click').click(function(){
                movePage(-1,true);
                
            });
            $(container).find('#pagesize').change(function(){
                setSize(1,$(this).val());
                activateHover();
            });
            activateHover();
        });

        function activateHover(){
            var xOffset = 5;
            var yOffset = 10;

            $("td.tooltip").each(function(e){
                $(this).hover(function(e){
                    //var hoveredPos = $(e.target).offset();
                    //var parentHovered = $(hovered).parents('td.tooltip').get(0);
                    //$(this).append($(parentHovered).attr('titleTool'));
                    restartEnvTooltip();
                    if($("#tooltip",$(this)).length){
                        $(this).parents('tr.trSorter').addClass("tooltipSelected");
                        $("#tooltip",$(this))
                        .css("top",(e.pageY + yOffset) + "px")
                        .css("left",(e.pageX + xOffset) + "px")
                        .show();
                    }
                    return false;
                },
                function(){
                    //$("#tooltip",$(this)).remove();                    
                    $(this).parents('tr.trSorter').removeClass("tooltipSelected");
                    $("#tooltip",$(this)).hide();                    
                    return false;
                });
                $(this).mousemove(function(e){
                    $("#tooltip",$(this))
                    .css("top",(e.pageY + yOffset) + "px")
                    .css("left",(e.pageX + xOffset) + "px");
                    return false;
                });
            });
            function restartEnvTooltip(){
                $("#tooltip",$("tbody",$("#tablesorter"))).hide();
                $("tr.trSorter",$("tbody",$("#tablesorter"))).removeClass("tooltipSelected");
            }
        }

        function sortRows(ind,ord){
            var valuesToSort = new Array();
            var tr = $(bodieChild);
            var i = 0;
            tr.each(function(){
                valuesToSort.push([$($(this).children('td').get(ind)).text(),i++])
            });
            if(ord == 0){
                valuesToSort.sort(typeDataFunction);
            }
            else{
                valuesToSort.reverse();
            }
            var sortedTable = "";
            for(i = 0; i < valuesToSort.length; i++){
                sortedTable += '<tr class="trSorter">' + $(tr.get(valuesToSort[i][1]).cloneNode(true)).html() + '</tr>';
            }
            $(bodies).html(sortedTable);
        };

        function typeData(f,c){
            var g,h; f[0]=g=f[0].toLowerCase(), c[0]=h=c[0].toLowerCase();
            var i=parseFloat(f[0].replace(/(\$|\,)/g,'')), n=parseFloat(c[0].replace(/(\$|\,)/g,''));
            if(!isNaN(i)&&!isNaN(n)){
                g=i,h=n;
            }
            i=Date.parse(f[0]); n=Date.parse(c[0]);
            if(!isNaN(i)&&!isNaN(n)){
                g=i; h=n;
            }
            return g>h?1:(g<h?-1:0);
        };

        function move(d,m){
            var currentPage = $(container).find('#pagerText').text();
            var pageSize = parseInt($(container).find('#pagesize').val());
            currentPage = (m && d == 1) ? parseInt(currentPage.substr(currentPage.indexOf('/') + 1, currentPage.length)) : (m && d == -1) ? 1 : parseInt(currentPage.substr(0,currentPage.indexOf('/'))) + d;
            setSize(currentPage,pageSize);
        };
        function sizePage(currentPage,pageSize){
            var container = container;
            var totalPages = Math.ceil(nrows/pageSize);
            var insertTitle = currentPage + '/' + totalPages;
            var tr = $(bodieChild);
            var indInf = (currentPage - 1) * pageSize;
            var indHigh = indInf + pageSize;
            if(currentPage > totalPages || currentPage <= 0){
                return false;
            }
            else{
                $(container).find('#pagerText').html(insertTitle);
                //$('p:last').append('indInf ' + indInf + 'indHigh ' + indHigh);
                tr.each(function(){
                    $(this).css({
                        'display':'none'
                    });
                });
                for(i = indInf; i<indHigh; i++){
                    $(tr.get(i)).css({
                        'display':''
                    });
                }
                /*$('tr.trSorter:even',$(bodies)).css({'background-color':'#F0F0F6'});
                $('tr.trSorter:odd',$(bodies)).css({'background-color':'#FFFFFF'});*/
                $('tr.trSorter:even',$(bodies)).addClass('even');
                $('tr.trSorter:odd',$(bodies)).addClass('odd');
            }
            
        };

        return this;

    };

})(jQuery);
