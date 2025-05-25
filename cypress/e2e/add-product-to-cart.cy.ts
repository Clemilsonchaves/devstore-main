describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {
    cy.searchByQuery('moletom')

    // Aguarda o produto aparecer após a busca
    cy.get('a[href^="/product"]', { timeout: 10000 })
      .first()
      .should('be.visible')
      .click()

    // Aguarda a navegação para a página do produto
    cy.location('pathname', { timeout: 10000 }).should('include', '/product')

    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should run cypress tests', () => {
    cy.request('http://localhost:3000').its('status').should('eq', 200)

    cy.visit('http://localhost:3000')

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })
})
