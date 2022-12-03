if(document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded', ready)
}
else
{
    ready()
}

function ready()
{
    //----------------remove items from cart + update price------------------------
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')

    //untuk liat variable yg kita declare
    console.log(removeCartItemButtons)

    for(var i=0; i<removeCartItemButtons.length; i++)
    {
        //untuk setiap elemen yg dilewati loop ini
        var removeButton = removeCartItemButtons[i]

        //kalau kita click buttonnya, bakal jalan function removeCartItem
        removeButton.addEventListener('click', removeCartItem)

    }

    //--------------update price as we change qty-----------------------------------
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')

    for(var i=0; i<quantityInputs.length; i++)
    {
        //untuk setiap elemen yg dilewati loop ini
        var input = quantityInputs[i]

        //kalau input kita berubah, function quantityChanged bakal jalan
        input.addEventListener('change', quantityChanged)

    }

    //---------------------------add to cart----------------------------------------
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i=0; i<addToCartButtons.length; i++)
    {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    //---------------------------purchase button clicked------------------------------
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked()
{
    alert('Thank you for purchasing!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    //selama didalam cart ada barang
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(event)
{
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imagesrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imagesrc)
    addItemToCart(title, price, imagesrc)
    updateCartTotal()
}

function addItemToCart(title, price, imagesrc)
{
    var cartRow = document.createElement('div')

    //biar bisa edit html
    cartRow.classList.add('cart-row')

    var cartItems = document.getElementsByClassName('cart-items')[0]

    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    for(var i=0; i<cartItemNames.length; i++)
    {
        //untuk cek item cart double ga
        if(cartItemNames[i].innerText == title)
        {
            alert('this item already exists in your cart!')
            return
        }
    }

    //masukin html kesini, tapi harus diawali dengan BACKTICK
    var cartRowContents = 
    `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
     <div class="cart-quantity cart-column">
         <input class="cart-quantity-input" type="number" value="1">
         <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event)
{
    var input = event.target

    //isNaN = untuk cek apakah valuenya adalah number atau bkn
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1
    }

    updateCartTotal()
}

function removeCartItem(event)
{
    //event.target untuk target button yg kita click 
    var buttonClicked = event.target

    //untuk remove parentnya parent dri button ini (remove item)
    buttonClicked.parentElement.parentElement.remove()

    updateCartTotal()
}

//untuk ganti total harga
function updateCartTotal()
{
    //kita cuma mau ambil 1 row cart item nya, jdi kasih index 0
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]

    //element cart-row berada didalam cartItemContainer
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    var total = 0

    for(var i=0; i<cartRows.length; i++)
    {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        //value = value yg diinput user
        var quantity = quantityElement.value

        total = total + (price * quantity)
         
    }
    //untuk jadiin 2 angka dibelakang koma
    total = Math.round(total * 100) /100

    //cantumkan total pricenya
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}