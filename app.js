let data = JSON.parse(localStorage.getItem("nocData")) || [];
let editIndex = -1;

function getCoreColor(core) {
  const colors = [
    "#2196F3","#FF9800","#4CAF50","#795548",
    "#9E9E9E","#FFFFFF","#F44336","#000000",
    "#FFEB3B","#9C27B0","#E91E63","#00BCD4"
  ];
  return colors[(core - 1) % colors.length];
}

function tambahData() {
  let jalur = document.getElementById("jalur").value;
  let odp = document.getElementById("odp").value;
  let core = parseInt(document.getElementById("core").value);
  let pot = parseInt(document.getElementById("pot").value);
  let status = document.getElementById("status").value;

  if (!jalur || !odp || isNaN(core) || isNaN(pot)) {
    alert("Lengkapi data!");
    return;
  }

  let newData = { jalur, odp, core, pot, status };

  if (editIndex === -1) {
    data.push(newData);
  } else {
    data[editIndex] = newData;
    editIndex = -1;
  }

  simpan();
  render();
}

function render() {
  let tabel = document.getElementById("tabel");
  tabel.innerHTML = "";

  let totalCore = 0;
  let jalurPutus = 0;

  data.forEach((d, i) => {
    totalCore += d.core;
    if (d.status === "Maintenance") jalurPutus++;

    tabel.innerHTML += `
    <td>
  <input class="line-input" value="${d.jalur}" readonly>
</td>

<td>
  <input class="line-input" value="${d.odp}" readonly>
</td>
      <td>
        <span class="core-badge" style="background:${getCoreColor(d.core)}; color:${d.core==6?'black':'white'}">
          ${d.core}
        </span>
      </td>
      <td>${d.pot}</td>
      <td class="${d.status=='Active'?'active':'maintenance'}">${d.status}</td>
      <td>
        <button onclick="edit(${i})">Edit</button>
        <button onclick="hapus(${i})">Hapus</button>
      </td>
    </tr>
    `;
  });

  document.getElementById("totalJalur").innerText = data.length;
  document.getElementById("totalCore").innerText = totalCore;
  document.getElementById("jalurPutus").innerText = jalurPutus;
}

function hapus(i) {
  if (confirm("Hapus data?")) {
    data.splice(i,1);
    simpan();
    render();
  }
}

function edit(i) {
  let d = data[i];
  document.getElementById("jalur").value = d.jalur;
  document.getElementById("odp").value = d.odp;
  document.getElementById("core").value = d.core;
  document.getElementById("pot").value = d.pot;
  document.getElementById("status").value = d.status;

  editIndex = i;
}

function cari() {
  let key = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll("tbody tr").forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(key) ? "" : "none";
  });
}

function simpan() {
  localStorage.setItem("nocData", JSON.stringify(data));
}

render();
