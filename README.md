# LightWeightTableSorterNPager
Light weight table sorter and pager in JQuery

## Options in the lightweight js plugin
```
var options = {
  'sortList': [],
  'widget': 'zebra',
  'pageSize': 10,
  'pageable': null
};
```
- sortList: Array to be sorted (optional)
- widget: Widget to be used on the tables, if any (optional)
- pageSize: Number of elements to be displayed per page (requiered)
- pageable: CSS container for the pager element (optional)

## Usage
### Import JS files
```
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="lightwSortedTable.js"></script>
```
### Apply the puglin to the CSS Id element
```
<script type="text/javascript" language="javascript">
  $(document).ready(function(){
    $('#tablesorter').lighttablesorter({
	pageSize:5,
	pageable:$('#pager')
	});
    });
</script>
```
### HTML id skeleton as example
```
<table class='sortable'  id='tablesorter' border="1">
  <thead>
    <tr id='sortableHeader'>
	<th>Column1</th>
	<th>Column2</th>
    </tr>
  </thead>
  <tbody align='right'>
    <tr class='trSorter'>
	<td>Value11
	</td>
	<td>Value12
	</td>
    </tr>
	<tr class='trSorter'>
	<td>Value21
	</td>
	<td>Value22
	</td>
    </tr>
    ...
    <tr class='trSorter'>
	<td>Value151
	</td>
	<td>Value152
	</td>
    </tr>
    <tr class='trSorter'>
        <td>Value161
	</td>
	<td>Value162
	</td>
    </tr>
  </tbody>
</table>
```

![Table](https://github.com/Cesar642/LightWeightTableSorterNPager/assets/44422221/5e8a4abf-c65e-48ec-8b97-aeff2b6e8218)

> With pager defined
### Pager element example
```
<div class="pager" id="pager" style="left: 19px;">
  <form>
    <table border="0" cellspacing = "0" cellpadding="0">
      <tr  align="center">
	<td>
	  <img id = "first" class="first" src="css/icons/first.png"/>
	  <img id = "prev" class="prev" src="css/icons/prev.png"/>
	</td>
	<td style = "border:solid 1px #000000;" width = "100px">
	  <span id="pagerText" class="sortable"></span>
	</td>
	<td>
	  <img id = "next" class="next" src="css/icons/next.png"/>
	  <img id = "last" class="last" src="css/icons/last.png"/>
	</td>
	<td>
	  <select id="pagesize" class="pagesize" style="display:none">
	    <option value="5" selected="selected">5</option>
	    <option value="10">10</option>
	    <option value="11">11</option>
	    <option value="12">12</option>
            ...
	    <option value="20">20</option>
	    <option value="24">24</option>
	    <option value="30">30</option>
	    <option value="40">40</option>
	  </select>
	</td>
      </tr>
   </table>
  </form>
</div>
```
![Table2](https://github.com/Cesar642/LightWeightTableSorterNPager/assets/44422221/a89bcd83-3bb8-4078-9b68-5add107bf38b)
