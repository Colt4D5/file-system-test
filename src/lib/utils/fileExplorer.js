import { windows } from '$stores/windows.js';
import { getRandomId } from '$utils/uuid.js';

export const openFile = async (e) => {
  const directory = e.target.closest('.file').dataset.directory;
  if (e.target.closest('.file').querySelector('h2').textContent.endsWith('.txt')) {
    const txtObj = {
      id: getRandomId(),
      directory,
      title: directory.split('/').pop(),
      type: 'txt',
      isFullScreen: false,
      position: {
        x: null,
        y: null
      }
    }
    windows.update(win => [txtObj, ...win]);
  } else {
    const res = await fetch('/api/open-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ directory })
    });
    const files = await res.json();
    const folderObj = {
      id: getRandomId(),
      directory,
      title: directory.split('/').pop(),
      files: files.map(file => file.replace('.svelte', '')),
      type: 'folder',
      isFullScreen: false,
      position: {
        x: null,
        y: null
      }
    }
    if (e.target.closest('.file').dataset.isOnDesktop === 'true') {
      windows.update(win => [folderObj, ...win]);
    } else {
      const updatedFolderObj = {
        id: e.target.closest('.os-window').dataset.id,
        ...folderObj
      };
      windows.update(win => {
        const newObj = win.map(w => {
          if (+w.id === +e.target.closest('.os-window').dataset.id) {
            w.files = files.map(f => f.replace('.svelte', ''));
            w.directory = directory;
          }
        })
        return win;
      });
    }
  }
}

export const getIcon = (file) => {
  if (file.toLowerCase() === 'bin') {
    return '/images/trash-bin.svg';
  } else if (file.endsWith('.txt')) {
    return '/images/doc.svg';
  } else {
    return '/images/folder.svg'
  }
}