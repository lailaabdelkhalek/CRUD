var productctNameInput=document.getElementById('productnameinput');  //input kollo
var productPriceInput=document.getElementById('productpriceinput');
var productCategoryInput=document.getElementById('productcategoryinput');
var producttDescInput=document.getElementById('productdescinput');

var addBtn=document.getElementById('addbtn');
var updateBtn=document.getElementById('updatebtn');


var productsContainer ;

if(localStorage.getItem('myProducts') !=null)
{
    productsContainer = JSON.parse( localStorage.getItem('myProducts') );
    displayProduct(productsContainer);
}
else
{
    productsContainer =[];
}
function addProduct()
{
    if(validateProductName() && validateProductPrice()&& validateProductCategory()&&validateProductDesc()==true)
    {var product={
           name:productctNameInput.value ,
           price:productPriceInput.value ,
           category:productCategoryInput.value ,
           desc:producttDescInput.value
        }

   productsContainer.push(product);
   localStorage.setItem('myProducts' ,JSON.stringify(productsContainer))
    
   clearForm();
   displayProduct(productsContainer);
    }
}


function clearForm(){
    productctNameInput.value ="";
    productPriceInput.value ="";
    productCategoryInput.value ="";
    producttDescInput.valu="";
}

function displayProduct(productList) {
    var cartona= "";

    for(var i=0; i<productList.length ; i++)
    {
         cartona+=`
                   <tr>
                   <td>${[i+1]}</td>
                   <td>${productList[i].name}</td>
                   <td>${productList[i].price}</td>
                   <td>${productList[i].category}</td>
                   <td>${productList[i].desc}</td>
                   <td><button onclick="updateProduct(${i})" class="btn btn-sm btn-warning">update</button></td>
                   <td><button onclick="deleteProduct(${i})" class="btn btn-sm btn-danger">delete</button></td>
                   </tr>`
         
    }
    document.getElementById('tablebody').innerHTML=cartona;
}


function searchProduct(searchTerm)
{
     var searchResult =[];
    for (var i=0 ; i<productsContainer.length ;i++)
    {
       if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true)
       {
          searchResult.push(productsContainer[i]);
       }
    }
    displayProduct(searchResult);
}



function deleteProduct(deletedIndex)
{
   productsContainer.splice(deletedIndex,1);
   localStorage.setItem('myProducts' ,JSON.stringify(productsContainer));

   displayProduct(productsContainer);
}


function updateProduct(updatedIndex)
{
    productctNameInput.value =productsContainer[updatedIndex].name;
    productPriceInput.value =productsContainer[updatedIndex].price;
    productCategoryInput.value =productsContainer[updatedIndex].category;
    producttDescInput.value=productsContainer[updatedIndex].desc;   


    updateBtn.classList.replace('d-none' , 'd-inline-block');
    addBtn.classList.add('d-none');
}


function validateProductName()
{
  var regex=/^[A-Za-z][A-Za-z0-9_]{7,29}$/;
  if (regex.test(productctNameInput.value)==true)
  {
    productctNameInput.classList.replace('is-invalid','is-valid')
    return true;
  }
  else
  {
    productctNameInput.classList.add('is-invalid')
    return false;
  }
}

function validateProductPrice()
{
  var regex=/^[1-9]\d{0,7}(?:\.\d{1,4})?$/;
  if (regex.test(productPriceInput.value)==true)
  {
    productPriceInput.classList.replace('is-invalid','is-valid')
    return true;
  }
  else
  {
    productPriceInput.classList.add('is-invalid')
    return false;
  }
}

function validateProductCategory()
{
  var regex=/^[A-Za-z][A-Za-z]{5,29}$/;
  if (regex.test(productCategoryInput.value)==true)
  {
    productCategoryInput.classList.replace('is-invalid','is-valid')
    return true;
  }
  else
  {
    productCategoryInput.classList.add('is-invalid')
    return false;
  }
}

function validateProductDesc()
{
  var regex=/^[A-Za-z][A-Za-z]{7,100}$/;
  if (regex.test(producttDescInput.value)==true)
  {
    producttDescInput.classList.replace('is-invalid','is-valid')
    return true;
  }
  else
  {
    producttDescInput.classList.add('is-invalid')
    return false;
  }
}