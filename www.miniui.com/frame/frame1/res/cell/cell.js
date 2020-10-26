
//{ id, text, parentId?, href?, hrefTarget?, icon, iconCls, cls, expanded, children }

var Cell_Id = 1;

var Cell = function (element, options) {
    this.element = $(element);
    this.options = $.extend(true, {}, this.options, options);
    this.init();
}

Cell.prototype = {

    options: {
        data: null,    
        itemclick: null
    },

    loadData: function (data) {
        this.options.data = data || [];
        this.refresh();
    },

    refresh: function () {
        this._render();
    },

    init: function () {
        var me = this,
            opt = me.options,
            el = me.element;

        //el.addClass('menu');

        me.loadData(opt.data);


    },

    _render: function () {
        var data = this.options.data || [];
         this._renderItems(data, null);
        // this.element.html(html);        
    },

    _renderItems: function (items, parent) {
        // var s = '<ul class="' + (parent ? "menu-submenu" : "menu") + '">';
        // for (var i = 0, l = items.length; i < l; i++) {
        //     var item = items[i];
        //     s += this._renderItem(item);
        // }
        // s += '</ul>';
        let that = this
        let s = ''
        Object.getOwnPropertyNames(items).forEach(function(key){
          console.log(key+ '---'+items[key])
          if(key==='Button'){
            that._renderButton(items[key])
          }
          if(key==='Column'){
            that._renderColum(items[key])
          }
        })
        console.log(s)
        console.log(items)
        return s;
    },
    _renderButton: function(list){
      let s = `<div class="mini-toolbar" style="border-bottom:0;padding:0px;">
      <table style="width:100%;">
          <tr>
              <td style="width:100%;">`

      
      list.forEach(v=>{
        s+= `<a class="mini-button" onclick="onClick" enabled="false" plain="true">${v.ButtonName}</a>`
      })
      s+=`        </td>

      </tr>
  </table>           
</div>`
      $('#btns').html(s)
    },
    _renderColum: function(list){
      //初始化列 { type: "indexcolumn",header: "序", width: 40, headerAlign: "center"}
      let initColumns =[]
      list.forEach(v=>{
        initColumns.push({
          header: v.displayname, field: v.id, width: '20%', headerAlign: "center"
        })
      })
      // var initColumns = [column0,column1, column2];
      var grid = mini.get("datagrid");//根据id拿到表格
      grid.setColumns(initColumns);//设置列
      let s = ''
      // let s = ` <div property="columns">
      //     <div type="indexcolumn" ></div>`
      // list.forEach(v=>{
      //   s+=`
      //   <div field="loginname" width="120" headerAlign="center" allowSort="true">${v.displayname}</div> 
      //   `
      // })
      // s+='</div>'
      return s
    },
    _renderItem: function (item) {

        var me = this,
            hasChildren = item.children && item.children.length > 0;

        var s = '<li class="' + (hasChildren ? 'has-children' : '') + '">';        //class="menu-item" open, expanded?

        s += '<a class="menu-title" data-id="' + item.id + '" ';
        //        if (item.href) {
        //            s += 'href="' + item.href + '" target="' + (item.hrefTarget || '') + '"';
        //        }
        s += '>';

        s += '<i class="menu-icon fa ' + item.iconCls + '"></i>';
        s += '<span class="menu-text">' + item.text + '</span>';

        if (hasChildren) {
            s += '<span class="menu-arrow fa"></span>';
        }

        s += '</a>';

        if (hasChildren) {
            s += me._renderItems(item.children, item);
        }

        s += '</li>';
        return s;
    },

    getItemByEvent: function (event) {
        var el = $(event.target).closest('.menu-title');
        var id = el.attr("data-id");
        return this.getItemById(id);
    },

    getItemById: function (id) {
        var me = this,
            idHash = me._idHash;

        if (!idHash) {
            idHash = me._idHash = {};
            function each(items) {
                for (var i = 0, l = items.length; i < l; i++) {
                    var item = items[i];
                    if (item.children) each(item.children);
                    idHash[item.id] = item;
                }
            }
            each(me.options.data);
        }

        return me._idHash[id];
    }

};
