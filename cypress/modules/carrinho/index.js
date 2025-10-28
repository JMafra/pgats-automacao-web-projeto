class Carrinho{
    buscarProdutoNoCarrinho(nomeDoProduto){
        cy.get('input[id="search_product"]').type(nomeDoProduto)
        cy.get('button[id="submit_search"]').click()
    }

    adicionarProdutoAoCarrinho(){
      cy.get('a[href="/product_details/1"]').click()
      cy.get('button[class="btn btn-default cart"]').click()
      cy.contains('a', 'View Cart').click()  
      cy.get('a[class="btn btn-default check_out"]').click()   
      cy.get('a[class="btn btn-default check_out"]').click()   
    }

   adicionarInformacoesDePagamentoEFinalizarCompra(){
     cy.get('input[name="name_on_card"]').type('Juliana Mafra')
      cy.get('input[name="card_number"]').type('4111111111111111')
      cy.get('input[name="cvc"]').type('123')
      cy.get('input[name="expiry_month"]').type('12')
      cy.get('input[name="expiry_year"]').type('2025')
      cy.get('button[id="submit"]').click()
    }

}

export default new Carrinho();