  // max purchase sim Function 
  // added code in theme liquid and settigns file also
 if($('body.product').length || $('body.cart').length){
  const maxPurchasePro =  window.max_purchase_product;
  var productMatched = false;  
  const maxPurchaseProArr =  maxPurchasePro.split(',');
  var maxPurchaseCount =  window.max_purchase_product_count;
  const proTitle = $('.product_shop .product-title').text().toLowerCase();
  const qtnInput =  '.product_shop .qty-group input';
  const plusBTn = ' .product_shop .qty-group .plus.button';
  const minusBTn = ' .product_shop .qty-group .minus.button';
  const atcBtn = '.product_shop .product-form__cart-submit';
  const cartRemoveBtn = '.cart-dropdown .product-details'
   
  if($('body.product').length){
  const resetDefault = () =>{  
      $(atcBtn).prop("disabled", false);
      $(plusBTn).prop("disabled", false);
      maxPurchaseCount =  window.max_purchase_product_count;
    }
  const cehckQTnOnLoad = () =>{
      $.getJSON('../cart.js', function(cart) {
        console.log("cart items")
        console.log(cart)
        cart.items.forEach(item =>{
          if(item.product_title.toLowerCase() == proTitle ){
            if(item.quantity == maxPurchaseCount){
            $(atcBtn).prop("disabled", true)
            }
          else{
           var ntq = maxPurchaseCount - item.quantity;
            alert('after '+ maxPurchaseCount)
            $(qtnInput).val(ntq)
              $(plusBTn).prop("disabled", true);
          
          }      
          }
        })
});
    }   
    maxPurchaseProArr.forEach(proName => {
      if( proName.toLowerCase() ==  proTitle ){
        productMatched = true;
        console.log('product matched')
        $(document).on('change',qtnInput,() =>{
         
            
          if( $(qtnInput).val() == maxPurchaseCount ) {
            $(plusBTn).prop("disabled", true);
           
          }
          else{
            $(plusBTn).prop("disabled", false);
          }
        })
      }
    }) 
    if(productMatched){
    cehckQTnOnLoad();  
    }
    $(document).on('click',cartRemoveBtn,()=>{setTimeout(resetDefault,2000)})
    $(atcBtn).click(()=>{setTimeout(cehckQTnOnLoad,2000)})
  }
 if($('body.cart').length){
   var cartItems = $('.cart-list > li');
   alert('cart')
   cartItems.each(function(){
     console.log('item' )
     // console.log(cartItem)
     $(this).find('.product-title');
     var title = $(this).find('.product-title').text()
     alert(title.trim())
     if(maxPurchaseProArr.includes(title.trim())){
       $(this).find('.qty-group').hide();
     }
   })
 } 
 }  
  //max purchase end here 
