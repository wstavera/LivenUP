var CommonHelper = {
    
    siteUrl: null,
    
    parseDataTableAoData: function (data) {
        var arr = {};
        for (var i = 0; i < data.length; i++) {
            arr[data[i].name] = data[i].value;
        }
        return arr;
    },

    displayAlert: function(message, type){
       alert(message);
    },

    addOptionsToDropdown: function(ele, items, value_field, text_field, selected_value){
        ele.html("");

        var option_default = $('<option>');
        option_default.val('');
        option_default.text('-- Select --');
        ele.append(option_default);

        for(var i=0; i<items.length; i++){
            var option = $('<option>');
            option.val(items[i][value_field]);
            option.text(items[i][text_field]);
            ele.append(option);
        }
        if(selected_value){
            ele.val(selected_value);
            ele.trigger('change');
        }
    },

    initDataTable: function (eleId, ajax_source_method, set_params_callback, data_convert_method, options) {
        if (!options) options = new Array();
        var columnDefs = [];
        $(eleId + " thead th").each(function (index, ele) {
            if ($(ele).attr("data-sort"))
                columnDefs.push({ aTargets: [index], bSortable: true, sName: $(ele).attr("data-sort") });
            else
                columnDefs.push({ aTargets: [index], bSortable: false, sName: $(ele).attr("data-sort") });
        });

        var table = $(eleId).dataTable({
            //sDom: "<'dt-header'<'inline-cell'l><'inline-cell'i><'inline-cell'><'inline-cell 'p>>tr",
            //sDom: "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
            bPaginate: (options['pagination'] != undefined) ? options['pagination'] : true,
            bFilter: (options['search_box'] != undefined) ? options['search_box'] : true,
            bLengthChange: (options['record'] != undefined) ? options['record'] : true,
            //sScrollY: options['scrollY'],
            //scrollCollapse: true,
            //paging: options['paging'],
            aoColumnDefs: columnDefs,
            aLengthMenu: [[25, 50, 100, -1], [25, 50, 100, "All"]],
            bProcessing: true,
            bServerSide: true,
            //"sPaginationType": "bootstrap",
            fnServerData: function (sSource, aoData, fnCallback) {
                var dtParams = CommonHelper.parseDataTableAoData(aoData);
                var params = {};
                params = set_params_callback();
                //var data = { startIndex: dtParams.start, pageSize: dtParams.length, sortColumn: columnDefs[dtParams.order[0].column].sName, sortOrder: dtParams.order[0].dir, searchText: dtParams.sSearch };
                var data = {
                    iDisplayStart: dtParams.start, iDisplayLength: dtParams.length, sortColumn: columnDefs[dtParams.order[0].column].sName?columnDefs[dtParams.order[0].column].sName:'', 
                        sortOrder: dtParams.order[0].dir, searchText: dtParams.search.value
                };
                for (var s in params) {
                    data[s] = params[s];
                }
                ajax_source_method(data, function (result) {
                    var records = new Array();
                    if (result.status != 'Error') {
                        for (var i = 0; i < result.aaData.length; i++) {
                            records.push(data_convert_method(result.aaData[i]));
                        }
                    }

                    fnCallback({
                        "iTotalRecords": result.iTotalRecords,
                        "iTotalDisplayRecords": result.iTotalDisplayRecords,
                        "aaData": records
                    });
                });
            }
        });
        
        return table;
    },

    refreshDataTable: function (eleId) {
        $(eleId).dataTable().fnDraw(false);
    }// refreshDataTable
};