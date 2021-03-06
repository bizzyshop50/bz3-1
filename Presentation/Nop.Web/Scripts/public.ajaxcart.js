﻿/*
** nopCommerce ajax cart implementation
*/


var AjaxCart = {
    loadWaiting: false,
    usepopupnotifications: false,
    topcartselector: '',
    topwishlistselector: '',
    flyoutcartselector: '',

    init: function (usepopupnotifications, topcartselector, topwishlistselector, flyoutcartselector) {
        this.loadWaiting = false;
        this.usepopupnotifications = usepopupnotifications;
        this.topcartselector = topcartselector;
        this.topwishlistselector = topwishlistselector;
        this.flyoutcartselector = flyoutcartselector;
    },

    setLoadWaiting: function (display) {
        displayAjaxLoading(display);
        this.loadWaiting = display;
    },


    addproducttocart_catalog: function (urladd) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        $.ajax({
            cache: false,
            url: urladd,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    weightSender_productBox: function (productIdToSend) {

        console.log(productIdToSend);
        addproducttocart_catalog_Weight(productIdToSend);
    },

    //add a product to the cart/wishlist from the catalog pages
    addproducttocart_catalog_Weight: function (productId,url,baseWeight) {
        
        if (this.loadWaiting != false) {
            return;
        }
        if (isNaN(baseWeight) || baseWeight.trim() == '')
        {
            baseWeight = '1';
        }
        this.setLoadWaiting(true);
        var Id4Jq = "#" + productId.toString();
        var decQuantity = parseFloat(document.getElementById(productId).innerHTML);
        var intProductId = parseInt(productId.split("-")[1]);
        var postData = {
            productId: intProductId,
            shoppingCartTypeId: 1,
            decQuantity: decQuantity
        };
        document.getElementById(productId).innerHTML = baseWeight;

        $.ajax({
            cache: false,
            url: url,
            type: 'post',
            data: postData,
            dataType: 'json',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },



  increaseQuantityInput: function  (weight, prodId){
var idString = '#'+ prodId;
var currentValue = +$(idString).val();

var newValue = currentValue + parseInt(weight);
console.log(currentValue)
$(idString).val(newValue);
$(idString).prop('readonly', true);

},

reduceQuantityInput: function  (weight, prodId){
    var idString = '#'+ prodId;
    var currentValue = +$(idString).val();
    if (currentValue > 0){

        var newValue = currentValue - parseInt(weight);
        $(idString).val(newValue);

    }
},


    increaseQuantityFlyOutCart:  function (sciID,weight) {
        var idString = '#' + sciID;

     var currentValue = +$(idString).html();
     var newValue = currentValue + parseInt(weight);

     $(idString).html(newValue);
     //this.addproducttocart_flyOutCart_Weight(sciID, newValue);
},




    reduceQuantityFlyOutCart: function (sciID, weight) {
    var idString = '#' + sciID;
    var currentValue = +$(idString).html();
    if (currentValue > 0){

        var newValue = currentValue - parseInt(weight);
        $(idString).html(newValue);

        //this.addproducttocart_flyOutCart_Weight(sciID, newValue);
    }
    },








    increaseQuantityCart: function (sciID, weight) {
        var idString = '#' + sciID;
        console.log("old cart" + weight)
        var currentValue = +$(idString).html();
        var newValue = currentValue + parseInt(weight);
        console.log("old cart" + newValue)
        $(idString).html(newValue);
       // this.addproducttocart_flyOutCart_Weight(sciID, newValue);
    },




    reduceQuantityCart: function (sciID, weight) {
        var idString = '#' + sciID;
        var currentValue = +$(idString).html();
        if (currentValue > 0) {
            console.log("old weighy" + weight)
            var newValue = currentValue - parseInt(weight);
            //$(idString).html(newValue);
            console.log("new weighy" + newValue)
            $(idString).value(newValue);
           // this.addproducttocart_flyOutCart_Weight(sciID, newValue);
        }
    },


    pick_flyCart_weight(sciID){

        var idString = '#' + sciID;
        var currentValue = $(idString).html();
        if (currentValue >= 0) {

            this.addproducttocart_flyOutCart_Weight(sciID,currentValue)

        }
    },


    addproducttocart_flyOutCart_Weight: function (sciId,weight) {

        if (this.loadWaiting != false) {
            return;
        }
        //this.setLoadWaiting(true);
        //var Id4Jq = "#" + productId.toString();
        var decQuantity = parseFloat(weight);
        var intSciId = parseInt(sciId.split("-")[1]);
        var postData = {
            sciIdfromClient: intSciId,
            shoppingCartTypeId: 1,
            decQuantity: decQuantity
        };
        console.log(postData)
        $.ajax({
            cache: false,
            url: '/ShoppingCart/AddProductToCart_FlyOutCart_Weight',
            type: 'post',
            data: postData,
            dataType: 'json',
            success: this.success_process,
            //complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },



    //addproducttocart_Cart_Weight: function (sciId, weight) {

    //    if (this.loadWaiting != false) {
    //        return;
    //    }
    //    this.setLoadWaiting(true);
    //    //var Id4Jq = "#" + productId.toString();
    //    var decQuantity = parseFloat(weight);
    //    var intSciId = parseInt(sciId.split("-")[1]);
    //    var postData = {
    //        sciIdfromClient: intSciId,
    //        shoppingCartTypeId: 1,
    //        decQuantity: decQuantity
    //    };
    //    console.log(postData)
    //    $.ajax({
    //        cache: false,
    //        url: '/ShoppingCart/AddProductToCart_FlyOutCart_Weight',
    //        type: 'post',
    //        data: postData,
    //        dataType: 'json',
    //        success: this.success_process,
    //        complete: this.resetLoadWaiting,
    //        error: this.ajaxFailure
    //    });
    //},

    //add a product to the cart/wishlist from the product details page
    addproducttocart_details: function (urladd, formselector) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        $.ajax({
            cache: false,
            url: urladd,
            data: $(formselector).serialize(),
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //add a product to compare list
    addproducttocomparelist: function (urladd) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        $.ajax({
            cache: false,
            url: urladd,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    success_process: function (response) {
        if (response.updatetopcartsectionhtml) {
            $(AjaxCart.topcartselector).html(response.updatetopcartsectionhtml);
        }
        if (response.updatetopwishlistsectionhtml) {
            $(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
        }
        if (response.updateflyoutcartsectionhtml) {
            $(AjaxCart.flyoutcartselector).replaceWith(response.updateflyoutcartsectionhtml);
        }
        if (response.message) {
            //display notification
            if (response.success == true) {
                //success
                if (AjaxCart.usepopupnotifications == true) {
                    displayPopupNotification(response.message, 'success', true);
                }
                else {
                    //specify timeout for success messages
                    displayBarNotification(response.message, 'success', 3500);
                }
            }
            else {
                //error
                if (AjaxCart.usepopupnotifications == true) {
                    displayPopupNotification(response.message, 'error', true);
                }
                else {
                    //no timeout for errors
                    displayBarNotification(response.message, 'error', 0);
                }
            }
            return false;
        }
        if (response.redirect) {
            location.href = response.redirect;
            return true;
        }
        return false;
    },

    resetLoadWaiting: function () {
        AjaxCart.setLoadWaiting(false);
    },

    ajaxFailure: function () {
        alert('Failed to add the product. Please refresh the page and try one more time.');
    }
};