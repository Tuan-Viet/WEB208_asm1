import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  product: IProduct = {
    id: '',
    name: '',
    price: 0
  }

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
        this.productForm.patchValue({
          name: product.name,
          price: product.price
        })
      })
    })
  }
  productForm = this.formBuilder.group({
    name: [''],
    price: [0]
  })

  onHandleSubmit() {
    const product: IProduct = {
      id: this.product.id,
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0
    }

    this.productService.updateProduct(product).subscribe(data => {
      console.log(data);
      alert("Cap nhat thanh cong")
      this.router.navigate(['product'])
    })
  }
}
