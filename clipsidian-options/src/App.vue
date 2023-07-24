<template>
  <div id="app">
    <h1><img src="/icon/icon48.png"> Clipsidian Options</h1>
    <div class=" header">
      <h2>⏩︎ Clipping Actions</h2>
    </div>
    <div class="header">
      <div class="header-content">
        <p>Manage your list of actions here. Click on "Add Action" to add a new action to the list.</p>
      </div>
      <button @click="addAction">➕︎ Add Action</button>
    </div>
    <div v-for="(action, index) in actions" :key="index + '' + editingIndex" class="action"
      :class="{ editing: action.isEditing }">

      <div v-if="action.isEditing">
        <table class="form">
          <tbody>
            <tr>
              <td colspan=" 2"><label for="name"><b>✂︎</b> Action Name</label></td>
              <td colspan="1"><label for="vault">📦︎ Vault</label></td>
              <td colspan="2"><label for="path">🗐︎ Target Note Path</label></td>
            </tr>
            <tr>
              <td colspan="2">
                <input v-model="action.name" @input="action.isChanged = true" class="name" type="text"
                  placeholder="Enter action name...">
                <div class="help">
                  <div class="inner">
                    Enter a descriptive name for this clipping action.<br>
                    This name will appear when you right-click your selection.
                  </div>
                </div>
              </td>
              <td colspan="1"><input v-model="action.vault" @input="action.isChanged = true" class="vault" type="text"
                  placeholder="Enter vault name...">
                <div class="help">
                  <div class="inner">
                    Enter the name of the vault where the clips should be saved.<br>
                    The vault must already exist in your Obsidian workspace.
                  </div>
                </div>
              </td>
              <td colspan="2"><input v-model="action.path" @input="action.isChanged = true" class="path" type="text"
                  placeholder="Enter path to folder or note...">
                <div class="help">
                  <div class="inner">
                    Enter the path of the note within the vault where the clippings should be saved.<br>
                    You can use placeholders to name and refer to notes dynamically.<br>
                    <br>
                    <b>Placeholders</b><br>
                    <ul>
                      <li>
                        <span>{title}</span> The title of the webpage
                      </li>
                      <li><span>{date}</span> Current date in YYYY-MM-DD</li>
                      <li><span>{time}</span> Current time in HH:mm:ss</li>
                    </ul>

                    <b>Date / Time Formatting</b><br>
                    <ul>
                      <li>You can format date and time with <span>{date:FORMAT}</span> or <span>{time:FORMAT}</span> where
                        <span>FORMAT</span> is a valid <a href="#" @click="showMomentModal = true">moment format
                          string</a>.
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5"><label for="format">🔀︎ Clipping Template</label></td>
            </tr>
            <tr>
              <td colspan="5">
                <textarea v-model="action.format" @input="action.isChanged = true" class="format"
                  placeholder="Enter clipping formatting" rows="10"></textarea>
                <div class="help">
                  <div class="inner">
                    Enter the template for clipping formatting. You can use the following placeholders.<br>
                    <br>
                    <b>Placeholders</b><br>
                    <ul>
                      <li>
                        <span>{clip}</span> The actual content you're clipping
                      </li>
                      <li>
                        <span>{title}</span> The title of the webpage
                      </li>
                      <li><span>{url}</span> The URL of the webpage</li>
                      <li><span>{date}</span> Current date in YYYY-MM-DD</li>
                      <li><span>{time}</span> Current time in HH:mm:ss</li>
                    </ul>

                    <b>Date / Time Formatting</b><br>
                    <ul>
                      <li>You can format date and time with <span>{date:FORMAT}</span> or <span>{time:FORMAT}</span> where
                        <span>FORMAT</span> is a valid <a href="#" @click="showMomentModal = true">moment format
                          string</a>.
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <select @change="action.isChanged = true" v-model="action.overwrite">
                  <option :value="false">⤷︎ Append to note</option>
                  <option :value="true">🗘︎ Overwrite note</option>
                </select>
              </td>
              <td colspan="2">
                <div>
                  <input type="checkbox" v-model="action.openNote" @change="action.isChanged = true" id="openNote">
                  <label for="openNote">Open note after saving</label>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2"><button @click="removeAction(index)">❌︎ Delete</button></td>
              <td colspan="3" align="right">
                <button @click="testAction(action)">❓︎ Test Action</button>
                &nbsp;&nbsp;
                <button type="button" @click="endEdit(index)">✔︎ {{ action.isChanged ? 'Save Changes' : 'Done' }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <table class="form">
          <tr>
            <td>
              <p class="name">✂︎ {{ action.name }}</p>
              <button class="edit" @click="editAction(index)">🛠 Edit</button>
              <p class="path">📦︎ {{ action.vault }} ⮕︎ 🗐︎ {{ action.path }}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class=" header">
      <h2><span style="font-weight: normal;">🕐︎</span> Date / Time Formatting</h2>
    </div>
    <div class="action datetime">
      <table class="form">
        <tr>
          <td>
            <select v-model="selectedLocale" @change="saveLocale">
              <option value="af">Afrikaans</option>
              <option value="ar-dz">Arabic (Algeria)</option>
              <option value="ar-kw">Arabic (Kuwait)</option>
              <option value="ar-ly">Arabic (Libya)</option>
              <option value="ar-ma">Arabic (Morocco)</option>
              <option value="ar-sa">Arabic (Saudi Arabia)</option>
              <option value="ar-tn">Arabic (Tunisia)</option>
              <option value="ar">Arabic</option>
              <option value="az">Azerbaijani</option>
              <option value="be">Belarusian</option>
              <option value="bg">Bulgarian</option>
              <option value="bm">Bambara</option>
              <option value="bn-bd">Bengali (Bangladesh)</option>
              <option value="bn">Bengali</option>
              <option value="bo">Tibetan</option>
              <option value="br">Breton</option>
              <option value="bs">Bosnian</option>
              <option value="ca">Catalan</option>
              <option value="cs">Czech</option>
              <option value="cv">Chuvash</option>
              <option value="cy">Welsh</option>
              <option value="da">Danish</option>
              <option value="de-at">German (Austria)</option>
              <option value="de-ch">German (Switzerland)</option>
              <option value="de">German</option>
              <option value="dv">Divehi</option>
              <option value="el">Greek</option>
              <option value="en">English</option>
              <option value="en-au">English (Australia)</option>
              <option value="en-ca">English (Canada)</option>
              <option value="en-gb">English (United Kingdom)</option>
              <option value="en-ie">English (Ireland)</option>
              <option value="en-il">English (Israel)</option>
              <option value="en-in">English (India)</option>
              <option value="en-us">English (United States)</option>
              <option value="en-nz">English (New Zealand)</option>
              <option value="en-sg">English (Singapore)</option>
              <option value="eo">Esperanto</option>
              <option value="es-do">Spanish (Dominican Republic)</option>
              <option value="es-mx">Spanish (Mexico)</option>
              <option value="es-us">Spanish (United States)</option>
              <option value="es">Spanish</option>
              <option value="et">Estonian</option>
              <option value="eu">Basque</option>
              <option value="fa">Persian</option>
              <option value="fi">Finnish</option>
              <option value="fil">Filipino</option>
              <option value="fo">Faroese</option>
              <option value="fr-ca">French (Canada)</option>
              <option value="fr-ch">French (Switzerland)</option>
              <option value="fr">French</option>
              <option value="fy">Western Frisian</option>
              <option value="ga">Irish</option>
              <option value="gd">Scottish Gaelic</option>
              <option value="gl">Galician</option>
              <option value="gom-deva">Konkani (Devanagari)</option>
              <option value="gom-latn">Konkani (Latin)</option>
              <option value="gu">Gujarati</option>
              <option value="he">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="hr">Croatian</option>
              <option value="hu">Hungarian</option>
              <option value="hy-am">Armenian (Armenia)</option>
              <option value="id">Indonesian</option>
              <option value="is">Icelandic</option>
              <option value="it-ch">Italian (Switzerland)</option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="jv">Javanese</option>
              <option value="ka">Georgian</option>
              <option value="kk">Kazakh</option>
              <option value="km">Khmer</option>
              <option value="kn">Kannada</option>
              <option value="ko">Korean</option>
              <option value="ku">Kurdish</option>
              <option value="ky">Kirghiz</option>
              <option value="lb">Luxembourgish</option>
              <option value="lo">Lao</option>
              <option value="lt">Lithuanian</option>
              <option value="lv">Latvian</option>
              <option value="me">Montenegrin</option>
              <option value="mi">Maori</option>
              <option value="mk">Macedonian</option>
              <option value="ml">Malayalam</option>
              <option value="mn">Mongolian</option>
              <option value="mr">Marathi</option>
              <option value="ms-my">Malay (Malaysia)</option>
              <option value="ms">Malay</option>
              <option value="mt">Maltese</option>
              <option value="my">Burmese</option>
              <option value="nb">Norwegian Bokmål</option>
              <option value="ne">Nepali</option>
              <option value="nl-be">Dutch (Belgium)</option>
              <option value="nl">Dutch</option>
              <option value="nn">Norwegian Nynorsk</option>
              <option value="oc-lnc">Occitan (Lengadocian)</option>
              <option value="pa-in">Punjabi (India)</option>
              <option value="pl">Polish</option>
              <option value="pt-br">Portuguese (Brazil)</option>
              <option value="pt">Portuguese</option>
              <option value="ro">Romanian</option>
              <option value="ru">Russian</option>
              <option value="sd">Sindhi</option>
              <option value="se">Northern Sami</option>
              <option value="si">Sinhala</option>
              <option value="sk">Slovak</option>
              <option value="sl">Slovenian</option>
              <option value="sq">Albanian</option>
              <option value="sr-cyrl">Serbian (Cyrillic)</option>
              <option value="sr">Serbian</option>
              <option value="ss">Swati</option>
              <option value="sv">Swedish</option>
              <option value="sw">Swahili</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="tet">Tetum</option>
              <option value="tg">Tajik</option>
              <option value="th">Thai</option>
              <option value="tk">Turkmen</option>
              <option value="tl-ph">Tagalog (Philippines)</option>
              <option value="tlh">Klingon</option>
              <option value="tr">Turkish</option>
              <option value="tzl">Talossan</option>
              <option value="tzm-latn">Central Atlas Tamazight (Latin)</option>
              <option value="tzm">Central Atlas Tamazight</option>
              <option value="ug-cn">Uyghur (China)</option>
              <option value="uk">Ukrainian</option>
              <option value="ur">Urdu</option>
              <option value="uz-latn">Uzbek (Latin)</option>
              <option value="uz">Uzbek</option>
              <option value="vi">Vietnamese</option>
              <option value="x-pseudo">Pseudo</option>
              <option value="yo">Yoruba (Nigeria)</option>
              <option value="zh-cn">Chinese (China)</option>
              <option value="zh-hk">Chinese (Hong Kong)</option>
              <option value="zh-mo">Chinese (Macau)</option>
              <option value="zh-tw">Chinese (Taiwan)</option>
            </select>
            <p>🌐︎ Date and time locale</p>
          </td>
        </tr>
      </table>
    </div>

    <footer>
      <img src="/icon/icon48.png">
      <span class="left">Do you like Clipsidian? Consider contributing!</span>
      <span class="right">
        <a href="https://github.com/niondevi/clipsidian" title="GitHub" target="_blank"><img src="icon/github.svg">
          GitHub</a>
        <a href="https://www.patreon.com/niondevi" title="Patreon" target="_blank"><img src="icon/patreon.svg">
          Patreon</a>
        <a href="https://ko-fi.com/niondevi" title="Ko-fi" target="_blank"><img src="icon/ko-fi.svg"> Ko-fi</a>
      </span>
    </footer>
    <footer>
      <a href="https://www.flaticon.com/free-icons/scissors"> Scissors icon by Freepik</a>
      <a href="https://www.svgrepo.com/svg/512317/github-142"> GitHub icon by bypeople</a>
      <a href="https://www.svgrepo.com/svg/369473/patreon"> Patreon icon by Teenyicons</a>
      <a href="https://www.svgrepo.com/svg/341974/ko-fi"> Ko-fi icon by coreui</a>
    </footer>
  </div>
  <MomentModal v-model="showMomentModal"></MomentModal>
</template>

<script>
/* global chrome, moment */

import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  reactive
} from 'vue';

export default {
  name: 'ClipsidianOptions',

  setup() {

    var showMomentModal = ref(false);

    const defaultLocale = 'en'; // set your default locale
    const selectedLocale = ref(defaultLocale);

    const actions = ref([]);
    const defaultAction = {
      isEditing: true,
      isChanged: true,
      name: "Clip selection to Obsidian",
      vault: "Vault",
      path: "Web Clippings/{date}",
      format: `

{clip}

[{title}]({url})
{date:MMM Do YY} {time}`,
      overwrite: false, // 'false' for 'Append to note'
      openNote: true
    }

    const addAction = () => {
      actions.value.unshift(reactive({ ...defaultAction, isEditing: true, isChanged: true }));
    };

    const editAction = (actionIndex) => {
      actions.value[actionIndex].isEditing = true;
    };

    const endEdit = async (actionIndex) => {
      let action = actions.value[actionIndex];

      // Trim the fields
      action.name = action.name.trim();
      action.vault = action.vault.trim();
      action.path = action.path.trim();

      // Validate the fields individually
      if (!action.name) {
        alert('The name field cannot be blank.');
        return;
      }

      if (!action.vault) {
        alert('The vault field cannot be blank.');
        return;
      }

      if (!action.path) {
        alert('The path field cannot be blank.');
        return;
      }

      // Check if {clip} is included in format
      if (!action.format.includes('{clip}')) {
        alert('The template must include {clip}.');
        return;
      }

      actions.value[actionIndex].isEditing = false;
      actions.value[actionIndex].isChanged = false;

      await saveActions();
    };

    const removeAction = async (index) => {
      if (window.confirm("Are you sure you want to remove this action?")) {
        actions.value.splice(index, 1);
        await saveActions();
      }
    };

    const parsePlaceholders = (format, clip, title, url) => {
      let output = format;
      clip = encodeURIComponent(clip)
      title = encodeURIComponent(title)
      url = encodeURIComponent(url)


      const replaceDateTime = (pattern, defaultFormat) => {
        let re = new RegExp(`{${pattern}:(.*?)}`, 'g');
        let match = re.exec(output);
        while (match != null) {
          output = output.replace(match[0], moment().format(match[1]));
          match = re.exec(output);
        }
        output = output.replace(new RegExp(`{${pattern}}`, 'g'), defaultFormat);
      }

      // Replace {date}, {date:FORMAT}, {time}, {time:FORMAT}
      replaceDateTime('date', () => moment().format('YYYY-MM-DD'));
      replaceDateTime('time', () => moment().format('HH:mm:ss'));

      // Replace {clip} with the provided clip string
      output = output.replace(/{clip}/g, clip);

      // Replace {title} with the provided title string
      output = output.replace(/{title}/g, title);

      // Replace {url} with the provided url string
      output = output.replace(/{url}/g, url);

      return output;
    };

    const testAction = (action) => {
      const { name, vault, path, format, overwrite, openNote } = action;

      // Prepare data for placeholders
      const clip = `This is a test. The purpose of this test is to ensure that the "${name}" action is functioning correctly.`;
      const title = "Clipsidian Options";
      const url = "https://niondevi.github.io/clipsidian/";

      // Parse placeholders in format
      const content = parsePlaceholders(format, clip, title, url);
      const dynPath = parsePlaceholders(path, '', title, url);

      // Construct the URL
      // let obsidianUrl = 'http://127.0.0.1:8080/new.htm'; // testing
      let obsidianUrl = 'https://niondevi.github.io/clipsidian/new.htm';
      obsidianUrl += '?vault=' + encodeURI(vault);
      obsidianUrl += '&file=' + encodeURI(dynPath);
      obsidianUrl += '&content=' + encodeURI(content);
      obsidianUrl += `&append=${!overwrite}&silent=${!openNote}`;

      // If an iframe already exists, remove it
      let existingIframe = document.getElementById('clipsidian-iframe');
      if (existingIframe) {
        existingIframe.remove();
      }

      // Create a new iframe, set its source to the URL and make it hidden
      let iframe = document.createElement('iframe');
      iframe.id = 'clipsidian-iframe';
      iframe.src = obsidianUrl;
      iframe.style.display = 'none';

      // Append the hidden iframe to the document body
      document.body.appendChild(iframe);
    };



    const saveActions = () => {
      // Create a new array of actions, excluding the isEditing key
      let a = actions.value.map(action => {
        const { isEditing, isChanged, ...actionWithoutIsEditing } = action;
        isEditing; isChanged;
        return actionWithoutIsEditing;
      });

      return new Promise((resolve, reject) => {
        chrome.storage.sync.set({ actions: a }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      });
    };

    onBeforeMount(() => {

      window.addEventListener('beforeunload', (e) => {
        const editing = actions.value.some(action => action.isEditing && action.isChanged);
        if (editing) {
          e.preventDefault();
          e.returnValue = '';
        }
      });

      chrome.storage.sync.get('actions', (result) => {
        if (result && Array.isArray(result.actions)) {
          if (result.actions.length == 0) {
            actions.value = [defaultAction]
          }
          else {
            actions.value = result.actions.map(action => ({ ...action, isEditing: false, isChanged: false }));
          }
        } else {
          actions.value = [defaultAction];
        }
      })
    });

    onMounted(() => {
      chrome.storage.sync.get('momentLocale', function (items) {
        if (!items.momentLocale) {
          let defaultLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
          defaultLocale = defaultLocale.toLowerCase();

          chrome.storage.sync.set({ 'momentLocale': defaultLocale });

          selectedLocale.value = defaultLocale;
        }
        else {
          selectedLocale.value = items.momentLocale.toLowerCase();
        }
        moment.locale(selectedLocale.value);
      });
    });

    const saveLocale = () => {
      chrome.storage.sync.set({ 'momentLocale': selectedLocale.value });
      moment.locale(selectedLocale.value);
    };


    onBeforeUnmount(async () => {
      await saveActions();
    });

    return {
      actions,
      addAction,
      editAction,
      endEdit,
      removeAction,
      testAction,
      selectedLocale,
      saveLocale,
      showMomentModal,
    };
  },
};
</script>
