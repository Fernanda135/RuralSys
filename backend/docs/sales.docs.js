/**
 * @swagger
 * tags:
 *   - name: Sales
 *     description: Gerenciamento de vendas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SaleItemRequest:
 *       type: object
 *       required:
 *         - stock_id
 *         - quantity
 *       properties:
 *         stock_id:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: number
 *           example: 10
 *         unit:
 *           type: string
 *           example: kg
 *
 *     SaleItem:
 *       allOf:
 *         - $ref: '#/components/schemas/SaleItemRequest'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             unit_price:
 *               type: number
 *               format: float
 *               example: 12.50
 *             total_price:
 *               type: number
 *               format: float
 *               example: 125.00
 *             stock:
 *               $ref: '#/components/schemas/Stock'
 *
 *     CreateSaleRequest:
 *       type: object
 *       required:
 *         - client_name
 *         - payment_method
 *         - items
 *       properties:
 *         client_name:
 *           type: string
 *           example: João Silva
 *         payment_method:
 *           type: string
 *           example: PIX
 *         sale_date:
 *           type: string
 *           format: date
 *           example: 2026-07-28
 *         status:
 *           type: string
 *           enum: [PENDENTE, PAGO, CANCELADO]
 *           example: PAGO
 *         notes:
 *           type: string
 *           example: Venda realizada na feira.
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SaleItemRequest'
 *
 *     Sale:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 3
 *         client_name:
 *           type: string
 *           example: João Silva
 *         total_price:
 *           type: number
 *           format: float
 *           example: 580.50
 *         payment_method:
 *           type: string
 *           example: PIX
 *         sale_date:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [PENDENTE, PAGO, CANCELADO]
 *         notes:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SaleItem'
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Listar vendas
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 *
 *   post:
 *     summary: Registrar nova venda
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSaleRequest'
 *           example:
 *             client_name: João Silva
 *             payment_method: PIX
 *             sale_date: 2026-07-28
 *             status: PAGO
 *             notes: Venda realizada na feira.
 *             items:
 *               - stock_id: 1
 *                 quantity: 20
 *                 unit: kg
 *               - stock_id: 2
 *                 quantity: 5
 *                 unit: un
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Buscar venda por ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Venda não encontrada
 *
 *   put:
 *     summary: Atualizar venda
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSaleRequest'
 *     responses:
 *       200:
 *         description: Venda atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Venda não encontrada
 *
 *   delete:
 *     summary: Remover venda
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venda removida com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Venda removida com sucesso.
 *       404:
 *         description: Venda não encontrada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */

/**
 * @swagger
 * /api/sales/summary:
 *   get:
 *     summary: Resumo das vendas
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Resumo das vendas
 *         content:
 *           application/json:
 *             example:
 *               totalSales: 45
 *               totalAmount: 23580.50
 *               averageTicket: 524.01
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */