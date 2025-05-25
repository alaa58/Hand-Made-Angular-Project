import { Component } from '@angular/core';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { NavBlankSellerComponent } from "../../components/nav-blankSeller/nav-blank.component";

@Component({
  selector: 'app-seller-layout',
  imports: [NavBlankComponent, FooterComponent, RouterModule, NavAuthComponent, NavBlankComponent, NavBlankSellerComponent],
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.css'
})
export class SellerLayoutComponent {

}
