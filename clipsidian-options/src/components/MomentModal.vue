<template>
  <div class="modal" v-if="showModal" @click.self="toggleModal">
    <div class="modal-content">
      <span class="close" @click="toggleModal">&times;</span>
      <h2>Date / Time Formatting</h2>
      <div class="description">
        Use the moment tokens listed below to format your <span>{date:FORMAT}</span> and
        <span>{time:FORMAT}</span>
        placeholders.<br>
        <br>
        <b>Examples</b><br>
        <div>
          <span>{date:MMMM Do, YYYY}</span> turns into something like <span>January 1st, 2000</span><br>
          <span>{time:hh:mm A}</span> turns into something like <span>12:34 AM</span><br>
        </div>
        <br>
      </div>
      <table class="date-time-table">
        <tbody>
          <tr>
            <th></th>
            <th>Token</th>
            <th>Output</th>
          </tr>
          <tr>
            <td><b>Month</b></td>
            <td>M</td>
            <td>1 2 ... 11 12</td>
          </tr>
          <tr>
            <td></td>
            <td>Mo</td>
            <td>1st 2nd ... 11th 12th</td>
          </tr>
          <tr>
            <td></td>
            <td>MM</td>
            <td>01 02 ... 11 12</td>
          </tr>
          <tr>
            <td></td>
            <td>MMM</td>
            <td>Jan Feb ... Nov Dec</td>
          </tr>
          <tr>
            <td></td>
            <td>MMMM</td>
            <td>January February ... November December</td>
          </tr>
          <tr>
            <td><b>Quarter</b></td>
            <td>Q</td>
            <td>1 2 3 4</td>
          </tr>
          <tr>
            <td></td>
            <td>Qo</td>
            <td>1st 2nd 3rd 4th</td>
          </tr>
          <tr>
            <td><b>Day of Month</b></td>
            <td>D</td>
            <td>1 2 ... 30 31</td>
          </tr>
          <tr>
            <td></td>
            <td>Do</td>
            <td>1st 2nd ... 30th 31st</td>
          </tr>
          <tr>
            <td></td>
            <td>DD</td>
            <td>01 02 ... 30 31</td>
          </tr>
          <tr>
            <td><b>Day of Year</b></td>
            <td>DDD</td>
            <td>1 2 ... 364 365</td>
          </tr>
          <tr>
            <td></td>
            <td>DDDo</td>
            <td>1st 2nd ... 364th 365th</td>
          </tr>
          <tr>
            <td></td>
            <td>DDDD</td>
            <td>001 002 ... 364 365</td>
          </tr>
          <tr>
            <td><b>Day of Week</b></td>
            <td>d</td>
            <td>0 1 ... 5 6</td>
          </tr>
          <tr>
            <td></td>
            <td>do</td>
            <td>0th 1st ... 5th 6th</td>
          </tr>
          <tr>
            <td></td>
            <td>dd</td>
            <td>Su Mo ... Fr Sa</td>
          </tr>
          <tr>
            <td></td>
            <td>ddd</td>
            <td>Sun Mon ... Fri Sat</td>
          </tr>
          <tr>
            <td></td>
            <td>dddd</td>
            <td>Sunday Monday ... Friday Saturday</td>
          </tr>
          <tr>
            <td><b>Day of Week (Locale)</b></td>
            <td>e</td>
            <td>0 1 ... 5 6</td>
          </tr>
          <tr>
            <td><b>Day of Week (ISO)</b></td>
            <td>E</td>
            <td>1 2 ... 6 7</td>
          </tr>
          <tr>
            <td><b>Week of Year</b></td>
            <td>w</td>
            <td>1 2 ... 52 53</td>
          </tr>
          <tr>
            <td></td>
            <td>wo</td>
            <td>1st 2nd ... 52nd 53rd</td>
          </tr>
          <tr>
            <td></td>
            <td>ww</td>
            <td>01 02 ... 52 53</td>
          </tr>
          <tr>
            <td><b>Week of Year (ISO)</b></td>
            <td>W</td>
            <td>1 2 ... 52 53</td>
          </tr>
          <tr>
            <td></td>
            <td>Wo</td>
            <td>1st 2nd ... 52nd 53rd</td>
          </tr>
          <tr>
            <td></td>
            <td>WW</td>
            <td>01 02 ... 52 53</td>
          </tr>
          <tr>
            <td><b>Year</b></td>
            <td>YY</td>
            <td>70 71 ... 29 30</td>
          </tr>
          <tr>
            <td></td>
            <td>YYYY</td>
            <td>1970 1971 ... 2029 2030</td>
          </tr>
          <!-- <tr>
            <td></td>
            <td>YYYYYY</td>
            <td>-001970 -001971 ... +001907 +001971
              <br />
              <b>Note:</b> <a href="https://tc39.es/ecma262/#sec-expanded-years">Expanded Years</a> (Covering the full
              time value range of approximately 273,790 years forward or backward from 01 January, 1970)
            </td>
          </tr> -->
          <tr>
            <td></td>
            <td>Y</td>
            <td>1970 1971 ... 9999 +10000 +10001
              <br />
              <!-- <b>Note:</b> This complies with the ISO 8601 standard for dates past the year 9999 -->
            </td>
          </tr>
          <tr>
            <td><b>Era Year</b></td>
            <td>y</td>
            <td>1 2 ... 2020 ... </td>
          </tr>
          <tr>
            <td><b>Era</b></td>
            <td>N, NN, NNN</td>
            <td> BC AD<br />
              <!-- <b>Note:</b> Abbr era name -->
            </td>
          </tr>
          <tr>
            <td></td>
            <td>NNNN</td>
            <td> Before Christ, Anno Domini <br />
              <!-- <b>Note:</b> Full era name -->
            </td>
          </tr>
          <tr>
            <td></td>
            <td>NNNNN</td>
            <td> BC AD<br />
              <!-- <b>Note:</b> Narrow era name -->
            </td>
          </tr>
          <tr>
            <td><b>Week Year</b></td>
            <td>gg</td>
            <td>70 71 ... 29 30</td>
          </tr>
          <tr>
            <td></td>
            <td>gggg</td>
            <td>1970 1971 ... 2029 2030</td>
          </tr>
          <tr>
            <td><b>Week Year (ISO)</b></td>
            <td>GG</td>
            <td>70 71 ... 29 30</td>
          </tr>
          <tr>
            <td></td>
            <td>GGGG</td>
            <td>1970 1971 ... 2029 2030</td>
          </tr>
          <tr>
            <td><b>AM/PM</b></td>
            <td>A</td>
            <td>AM PM</td>
          </tr>
          <tr>
            <td></td>
            <td>a</td>
            <td>am pm</td>
          </tr>
          <tr>
            <td><b>Hour</b></td>
            <td>H</td>
            <td>0 1 ... 22 23</td>
          </tr>
          <tr>
            <td></td>
            <td>HH</td>
            <td>00 01 ... 22 23</td>
          </tr>
          <tr>
            <td></td>
            <td>h</td>
            <td>1 2 ... 11 12</td>
          </tr>
          <tr>
            <td></td>
            <td>hh</td>
            <td>01 02 ... 11 12</td>
          </tr>
          <tr>
            <td></td>
            <td>k</td>
            <td>1 2 ... 23 24</td>
          </tr>
          <tr>
            <td></td>
            <td>kk</td>
            <td>01 02 ... 23 24</td>
          </tr>
          <tr>
            <td><b>Minute</b></td>
            <td>m</td>
            <td>0 1 ... 58 59</td>
          </tr>
          <tr>
            <td></td>
            <td>mm</td>
            <td>00 01 ... 58 59</td>
          </tr>
          <tr>
            <td><b>Second</b></td>
            <td>s</td>
            <td>0 1 ... 58 59</td>
          </tr>
          <tr>
            <td></td>
            <td>ss</td>
            <td>00 01 ... 58 59</td>
          </tr>
          <tr>
            <td><b>Fractional Second</b></td>
            <td>S</td>
            <td>0 1 ... 8 9</td>
          </tr>
          <tr>
            <td></td>
            <td>SS</td>
            <td>00 01 ... 98 99</td>
          </tr>
          <tr>
            <td></td>
            <td>SSS</td>
            <td>000 001 ... 998 999</td>
          </tr>
          <!-- <tr>
            <td></td>
            <td>SSSS ... SSSSSSSSS</td>
            <td>000[0..] 001[0..] ... 998[0..] 999[0..]</td>
          </tr> -->
          <tr>
            <td></td>
            <td>Z</td>
            <td>-07:00 -06:00 ... +06:00 +07:00</td>
          </tr>
          <tr>
            <td></td>
            <td>ZZ</td>
            <td>
              -0700 -0600 ... +0600 +0700
            </td>
          </tr>
          <tr>
            <td><b>Unix Timestamp</b></td>
            <td>X</td>
            <td>1360013296</td>
          </tr>
          <tr>
            <td><b>Unix Millisecond Timestamp</b></td>
            <td>x</td>
            <td>1360013296123</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue';

export default {
  name: 'MomentModal',
  props: ['modelValue'],
  setup(props, { emit }) {
    const showModal = ref(props.modelValue);

    watch(() => props.modelValue, newVal => {
      showModal.value = newVal;
      if (newVal) {
        document.documentElement.style.overflow = 'hidden';

        nextTick(() => {
          let table = document.querySelector('.date-time-table');
          let rows = table.rows;
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].textContent.trim() !== "") {
              rows[i].classList.add('non-empty-first-td');
            }
          }
        })
      }
      else {
        document.documentElement.style.overflow = 'auto';
      }
    });

    const toggleModal = () => {
      showModal.value = !showModal.value;
      emit('update:modelValue', showModal.value);
    };

    return {
      showModal,
      toggleModal,
    }
  }

}
</script>
<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
  user-select: text;
  padding: 2em 0;
}

.modal-content {
  background-color: #f5f5f5;
  color: #444444;
  margin: auto;
  padding: 20px;
  border-radius: 4px;
}

@media (prefers-color-scheme: dark) {
  .modal-content {
    background-color: #333333;
    color: #ffffff;
  }
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #6528F7;
  text-decoration: none;
  cursor: pointer;
}

.date-time-table {
  border-collapse: collapse;
  font-size: 0.9em;
  width: 100%;
}

tr.non-empty-first-td td {
  border-top: 2px solid #D7BBF5;
}

.description {
  font-size: 0.8em;
}

.description div {
  margin: 1em;
  background: rgba(128, 128, 128, 0.3);
  padding: 0.5em;
  line-height: 2em;
}

.description span {
  background: #A076F9;
  color: #ffffff;
  padding: 2px;
  font-weight: bold;
}


h2 {
  border-bottom: 2px solid #A076F7;
}
</style>
