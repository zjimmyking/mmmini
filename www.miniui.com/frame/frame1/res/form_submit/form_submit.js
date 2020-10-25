
//{ id, text, parentId?, href?, hrefTarget?, icon, iconCls, cls, expanded, children }

var Cell_Id = 1;

var FormSubmit = function (element, options) {
    this.element = $(element);
    this.options = $.extend(true, {}, this.options, options);
    this.init();
}

FormSubmit.prototype = {

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
        let html =  this._renderItems(data, null);
        this.element.html(html);        
    },

    _renderItems: function (items, parent) {

        let that = this
        let s = ''
        Object.getOwnPropertyNames(items).forEach(function(key){
          console.log(key+ '---'+items[key])
          if(key==='Button'){
            that._renderButton(items[key])
          }
          if(key==='Tab'){
           s+= that._renderTab(items[key])
          }
        })
        console.log(s)
        console.log(items)
        return s;
    },
    _renderButton: function(list){
      let s = ''
      list.forEach(v=>{
        s+= `<a class="mini-button" onclick="onClick" enabled="false" >${v.ButtonName}</a>`
      })
      $('#btns').html(s)
    },
    _renderTab: function(list){
      let that  = this
      let s = ''
      list.forEach(v=>{
        s+= `<div class="sub_tit">${v.TabName}</div>`
        s+= that._renderTabitem(v.Items)
      })
      return s
    },
    _renderTabitem: function(list){
      let s=''
      list.forEach(v=>{
        s+=`${v.Name}<br/><span class="mini-textbox" style="border-width: 0px;"><span class="mini-textbox-border mini-corner-all"><input type="text" class="mini-textbox-input" autocomplete="off" placeholder=""></span><input type="hidden"></span><br><br>`
      })
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
