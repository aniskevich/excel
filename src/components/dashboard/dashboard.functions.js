export function getAllRecords() {
  return `
    <div class="db__table db__view">

      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>

      <ul class="db__list">

        <li class="db__record">
          <a href="#">Таблица номер 1</a>
          <strong>12.06.2020</strong>
        </li>

        <li class="db__record">
          <a href="#">Таблица номер 2</a>
          <strong>12.06.2020</strong>
        </li>

      </ul>

    </div>
  `
}
