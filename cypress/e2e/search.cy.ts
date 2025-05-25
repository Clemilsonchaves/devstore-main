describe('Search and Add to Cart', () => {
  it('should be able to search for a product and add it to the cart', () => {
    cy.searchByQuery('moletom')

    // Aguarda o produto aparecer após a busca e estar estável
    cy.get('a[href^="/product"]', { timeout: 10000 })
      .first()
      .should('be.visible')
      .should('not.have.class', 'loading')
      .click()

    // Aguarda a navegação para a página do produto
    cy.location('pathname', { timeout: 10000 }).should('include', '/product')

    // Garante que o botão está visível antes de clicar
    cy.contains('Adicionar ao carrinho', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Verifica se o carrinho foi atualizado
    cy.contains('Cart (1)').should('exist')
  })
})
