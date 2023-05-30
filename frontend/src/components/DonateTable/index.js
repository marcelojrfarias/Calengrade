import React from 'react'

export default function DonateTable({ children, secondary, link, onClick }) {

  return (
    <table>
      <caption>Contribua com o projeto! 💚</caption>
      <thead>
        <tr>
          <th colSpan={2}>Faça uma doação ou compartilhe com os amigos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>🌐 1 ano de registro do domínio</td>
          <td align='right'>R$50</td>
        </tr>
        <tr>
          <td>🍺 1 Litrão no Sinucão</td>
          <td align='right'>R$10</td>
        </tr>
        <tr>
          <td>☕️ 1 Café na padoca</td>
          <td align='right'>R$5</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>❤️ Compartilhar</td>
          <td align='right'>Grátis</td>
        </tr>
      </tfoot>
    </table>
  )

}