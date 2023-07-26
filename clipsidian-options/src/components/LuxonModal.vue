<template>
  <div class="modal" v-if="showModal" @click.self="toggleModal">
    <div class="modal-content">
      <span class="close" @click="toggleModal">&times;</span>
      <h2>Date / Time Formatting</h2>
      <div class="description">
        Use the tokens listed below to format your <span>{date:FORMAT}</span> and
        <span>{time:FORMAT}</span>
        placeholders.<br>
        <br>
        <b>Examples</b><br>
        <div>
          <span>{date}</span> turns into something like <span>{{ dt('yyyy-LL-dd') }}</span> (Year-Month-Day)<br>
          <span>{time}</span> turns into something like <span>{{ dt('HH:mm:ss') }}</span> (24-hour time)<br>
          <span>{date:LLLL dd, yyyy}</span> turns into something like <span>{{ dt('LLLL dd, yyyy') }}</span><br>
          <span>{time:hh:mm a}</span> turns into something like <span>{{ dt('hh:mm a') }}</span><br>
        </div>
        <br>
        The examples below are provided in your selected locale.<br>
        <br><br>
      </div>

      <div class="action sticky">
        <b>Testing Area:</b>
        <input v-model="testValue" type="text" placeholder="Test your tokens here">
        <br>
        <p style="margin-bottom: 0;">
          {{ parsedTestValue.length ? parsedTestValue : 'The above text will be shown formatted here' }}
        </p>
      </div>


      <table class="date-time-table">
        <thead>
          <tr style="text-align: right;">
            <th>Token</th>
            <th colspan="3">Example in "{{ props.currentLocale }}"</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span>S</span></td>
            <td colspan="3">{{ dt('S') }}</td>
            <td>millisecond, no padding</td>
          </tr>
          <tr>
            <td><span>SSS</span></td>
            <td colspan="3">{{ dt('SSS') }}</td>
            <td>millisecond, padded to 3</td>
          </tr>
          <tr>
            <td><span>u</span></td>
            <td colspan="3">{{ dt('u') }}</td>
            <td>fractional seconds, functionally identical to SSS</td>
          </tr>
          <tr>
            <td><span>uu</span></td>
            <td colspan="3">{{ dt('uu') }}</td>
            <td>fractional seconds, between 0 and 99, padded to 2</td>
          </tr>
          <tr>
            <td><span>uuu</span></td>
            <td colspan="3">{{ dt('uuu') }}</td>
            <td>fractional seconds, between 0 and 9</td>
          </tr>
          <tr>
            <td><span>s</span></td>
            <td colspan="3">{{ dt('s') }}</td>
            <td>second, no padding</td>
          </tr>
          <tr>
            <td><span>ss</span></td>
            <td colspan="3">{{ dt('ss') }}</td>
            <td>second, padded to 2 padding</td>
          </tr>
          <tr>
            <td><span>m</span></td>
            <td colspan="3">{{ dt('m') }}</td>
            <td>minute, no padding</td>
          </tr>
          <tr>
            <td><span>mm</span></td>
            <td colspan="3">{{ dt('mm') }}</td>
            <td>minute, padded to 2</td>
          </tr>
          <tr>
            <td><span>h</span></td>
            <td colspan="3">{{ dt('h') }}</td>
            <td>hour in 12-hour time, no padding</td>
          </tr>
          <tr>
            <td><span>hh</span></td>
            <td colspan="3">{{ dt('hh') }}</td>
            <td>hour in 12-hour time, padded to 2</td>
          </tr>
          <tr>
            <td><span>H</span></td>
            <td colspan="3">{{ dt('H') }}</td>
            <td>hour in 24-hour time, no padding</td>
          </tr>
          <tr>
            <td><span>HH</span></td>
            <td colspan="3">{{ dt('HH') }}</td>
            <td>hour in 24-hour time, padded to 2</td>
          </tr>
          <tr>
            <td><span>Z</span></td>
            <td colspan="3">{{ dt('Z') }}</td>
            <td>narrow offset</td>
          </tr>
          <tr>
            <td><span>ZZ</span></td>
            <td colspan="3">{{ dt('ZZ') }}</td>
            <td>short offset</td>
          </tr>
          <tr>
            <td><span>ZZZ</span></td>
            <td colspan="3">{{ dt('ZZZ') }}</td>
            <td>techie offset</td>
          </tr>
          <tr>
            <td><span>ZZZZ</span></td>
            <td colspan="3">{{ dt('ZZZZ') }}</td>
            <td>abbreviated named offset</td>
          </tr>
          <tr>
            <td><span>ZZZZZ</span></td>
            <td colspan="3">{{ dt('ZZZZZ') }}</td>
            <td>unabbreviated named offset</td>
          </tr>
          <tr>
            <td><span>z</span></td>
            <td colspan="3">{{ dt('z') }}</td>
            <td>IANA zone</td>
          </tr>
          <tr>
            <td><span>a</span></td>
            <td colspan="3">{{ dt('a') }}</td>
            <td>meridiem</td>
          </tr>
          <tr>
            <td><span>d</span></td>
            <td colspan="3">{{ dt('d') }}</td>
            <td>day of the month, no padding</td>
          </tr>
          <tr>
            <td><span>dd</span></td>
            <td colspan="3">{{ dt('dd') }}</td>
            <td>day of the month, padded to 2</td>
          </tr>
          <tr>
            <td><span>c</span></td>
            <td>{{ dt('c') }}</td>
            <td><span>E</span></td>
            <td>{{ dt('E') }}</td>
            <td>day of the week, as number from 1-7 (Monday is 1, Sunday is 7)</td>
          </tr>
          <tr>
            <td><span>ccc</span></td>
            <td>{{ dt('ccc') }}</td>
            <td><span>EEE</span></td>
            <td>{{ dt('EEE') }}</td>
            <td>day of the week, as an abbreviate localized string</td>
          </tr>
          <tr>
            <td><span>cccc</span></td>
            <td>{{ dt('cccc') }}</td>
            <td><span>EEEE</span></td>
            <td>{{ dt('EEEE') }}</td>
            <td>day of the week, as an unabbreviated localized string</td>
          </tr>
          <tr>
            <td><span>ccccc</span></td>
            <td>{{ dt('ccccc') }}</td>
            <td><span>EEEEE</span></td>
            <td>{{ dt('EEEEE') }}</td>
            <td>day of the week, as a single localized letter</td>
          </tr>
          <tr>
            <td><span>L</span></td>
            <td>{{ dt('L') }}</td>
            <td><span>M</span></td>
            <td>{{ dt('M') }}</td>
            <td>month as an unpadded number</td>
          </tr>
          <tr>
            <td><span>LL</span></td>
            <td>{{ dt('LL') }}</td>
            <td><span>MM</span></td>
            <td>{{ dt('MM') }}</td>
            <td>month as a padded number</td>
          </tr>
          <tr>
            <td><span>LLL</span></td>
            <td>{{ dt('LLL') }}</td>
            <td><span>MMM</span></td>
            <td>{{ dt('MMM') }}</td>
            <td>month as an abbreviated localized string</td>
          </tr>
          <tr>
            <td><span>LLLL</span></td>
            <td>{{ dt('LLLL') }}</td>
            <td><span>MMMM</span></td>
            <td>{{ dt('MMMM') }}</td>
            <td>month as an unabbreviated localized string</td>
          </tr>
          <tr>
            <td><span>LLLLL</span></td>
            <td>{{ dt('LLLLL') }}</td>
            <td><span>MMMMM</span></td>
            <td>{{ dt('MMMMM') }}</td>
            <td>month as a single localized letter</td>
          </tr>
          <tr>
            <td><span>y</span></td>
            <td colspan="3">{{ dt('y') }}</td>
            <td>year, unpadded</td>
          </tr>
          <tr>
            <td><span>yy</span></td>
            <td colspan="3">{{ dt('yy') }}</td>
            <td>two-digit year</td>
          </tr>
          <tr>
            <td><span>yyyy</span></td>
            <td colspan="3">{{ dt('yyyy') }}</td>
            <td>four- to six- digit year, pads to 4</td>
          </tr>
          <tr>
            <td><span>G</span></td>
            <td colspan="3">{{ dt('G') }}</td>
            <td>abbreviated localized era</td>
          </tr>
          <tr>
            <td><span>GG</span></td>
            <td colspan="3">{{ dt('GG') }}</td>
            <td>unabbreviated localized era</td>
          </tr>
          <tr>
            <td><span>GGGGG</span></td>
            <td colspan="3">{{ dt('GGGGG') }}</td>
            <td>one-letter localized era</td>
          </tr>
          <tr>
            <td><span>kk</span></td>
            <td colspan="3">{{ dt('kk') }}</td>
            <td>ISO week year, unpadded</td>
          </tr>
          <tr>
            <td><span>kkkk</span></td>
            <td colspan="3">{{ dt('kkkk') }}</td>
            <td>ISO week year, padded to 4</td>
          </tr>
          <tr>
            <td><span>W</span></td>
            <td colspan="3">{{ dt('W') }}</td>
            <td>ISO week number, unpadded</td>
          </tr>
          <tr>
            <td><span>WW</span></td>
            <td colspan="3">{{ dt('WW') }}</td>
            <td>ISO week number, padded to 2</td>
          </tr>
          <tr>
            <td><span>o</span></td>
            <td colspan="3">{{ dt('o') }}</td>
            <td>ordinal (day of year), unpadded</td>
          </tr>
          <tr>
            <td><span>ooo</span></td>
            <td colspan="3">{{ dt('ooo') }}</td>
            <td>ordinal (day of year), padded to 3</td>
          </tr>
          <tr>
            <td><span>q</span></td>
            <td colspan="3">{{ dt('q') }}</td>
            <td>quarter, no padding</td>
          </tr>
          <tr>
            <td><span>qq</span></td>
            <td colspan="3">{{ dt('qq') }}</td>
            <td>quarter, padded to 2</td>
          </tr>
          <tr>
            <td><span>D</span></td>
            <td colspan="3">{{ dt('D') }}</td>
            <td>localized numeric date</td>
          </tr>
          <tr>
            <td><span>DD</span></td>
            <td colspan="3">{{ dt('DD') }}</td>
            <td>localized date with abbreviated month</td>
          </tr>
          <tr>
            <td><span>DDD</span></td>
            <td colspan="3">{{ dt('DDD') }}</td>
            <td>localized date with full month</td>
          </tr>
          <tr>
            <td><span>DDDD</span></td>
            <td colspan="3">{{ dt('DDDD') }}</td>
            <td>localized date with full month and weekday</td>
          </tr>
          <tr>
            <td><span>t</span></td>
            <td colspan="3">{{ dt('t') }}</td>
            <td>localized time</td>
          </tr>
          <tr>
            <td><span>tt</span></td>
            <td colspan="3">{{ dt('tt') }}</td>
            <td>localized time with seconds</td>
          </tr>
          <tr>
            <td><span>ttt</span></td>
            <td colspan="3">{{ dt('ttt') }}</td>
            <td>localized time with seconds and abbreviated offset</td>
          </tr>
          <tr>
            <td><span>tttt</span></td>
            <td colspan="3">{{ dt('tttt') }}</td>
            <td>localized time with seconds and full offset</td>
          </tr>
          <tr>
            <td><span>T</span></td>
            <td colspan="3">{{ dt('T') }}</td>
            <td>localized 24-hour time</td>
          </tr>
          <tr>
            <td><span>TT</span></td>
            <td colspan="3">{{ dt('TT') }}</td>
            <td>localized 24-hour time with seconds</td>
          </tr>
          <tr>
            <td><span>TTT</span></td>
            <td colspan="3">{{ dt('TTT') }}</td>
            <td>localized 24-hour time with seconds and abbreviated offset</td>
          </tr>
          <tr>
            <td><span>TTTT</span></td>
            <td colspan="3">{{ dt('TTTT') }}</td>
            <td>localized 24-hour time with seconds and full offset</td>
          </tr>
          <tr>
            <td><span>f</span></td>
            <td colspan="3">{{ dt('f') }}</td>
            <td>short localized date and time</td>
          </tr>
          <tr>
            <td><span>ff</span></td>
            <td colspan="3">{{ dt('ff') }}</td>
            <td>less short localized date and time</td>
          </tr>
          <tr>
            <td><span>fff</span></td>
            <td colspan="3">{{ dt('fff') }}</td>
            <td>verbose localized date and time</td>
          </tr>
          <tr>
            <td><span>ffff</span></td>
            <td colspan="3">{{ dt('ffff') }}</td>
            <td>extra verbose localized date and time</td>
          </tr>
          <tr>
            <td><span>F</span></td>
            <td colspan="3">{{ dt('F') }}</td>
            <td>short localized date and time with seconds</td>
          </tr>
          <tr>
            <td><span>FF</span></td>
            <td colspan="3">{{ dt('FF') }}</td>
            <td>less short localized date and time with seconds</td>
          </tr>
          <tr>
            <td><span>FFF</span></td>
            <td colspan="3">{{ dt('FFF') }}</td>
            <td>verbose localized date and time with seconds</td>
          </tr>
          <tr>
            <td><span>FFFF</span></td>
            <td colspan="3">{{ dt('FFFF') }}</td>
            <td>extra verbose localized date and time with seconds</td>
          </tr>
          <tr>
            <td><span>X</span></td>
            <td colspan="3">{{ dt('X') }}</td>
            <td>unix timestamp in seconds</td>
          </tr>
          <tr>
            <td><span>x</span></td>
            <td colspan="3">{{ dt('x') }}</td>
            <td>unix timestamp in milliseconds</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import { DateTime } from '../../../lib/luxon.min.js';
import { ref, watch, computed } from 'vue';

export default {
  name: 'LuxonModal',
  props: ['modelValue', 'currentLocale'],
  setup(props, { emit }) {
    const showModal = ref(props.modelValue);
    const testValue = ref('')

    watch(() => props.modelValue, newVal => {
      showModal.value = newVal;
      if (newVal) {
        document.documentElement.style.overflow = 'hidden';
      }
      else {
        document.documentElement.style.overflow = 'auto';
      }
    });

    const toggleModal = () => {
      showModal.value = !showModal.value;
      emit('update:modelValue', showModal.value);
    };

    const dt = (f) => {
      return DateTime.now().setLocale(props.currentLocale).toFormat(f)
    }

    const parsedTestValue = computed(() => dt(testValue.value))

    return {
      showModal,
      toggleModal,
      dt,
      props,
      testValue,
      parsedTestValue
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

.action {
  background: inherit;
}

.modal-content {
  background-color: #f5f5f5;
  color: #444444;
  margin: auto;
  padding: 20px;
  border-radius: 4px;
  max-width: 900px;
  position: relative;
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
  max-width: 900px;
}

@media (max-width: 900px) {
  .date-time-table {
    padding: 0 10px;
  }
}

th {
  border-bottom: 4px solid transparent;
  text-align: left;
  font-size: 1.1em;
  vertical-align: bottom;
  padding: 4px;
}

td {
  border-left: 6px solid transparent;
  padding: 3px 0px;
  font-size: 0.9em;
}

td:empty {
  border-bottom: 2px solid transparent;
}

td span {
  background-color: #D7BBF5;
  color: #333;
  padding: 1px 3px;
  line-height: calc(1em + 8px);
  font-weight: bold;
  font-size: 1em;
}

table tbody tr:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.3);
}

table tbody tr:nth-child(even) {
  background-color: transparent;
}

.description {
  font-size: 0.9em;
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

.sticky {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
