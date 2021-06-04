<script>
  import { Button, List, ListItem, Menu } from 'svelte-materialify';
  import GridNode from './Grid/GridNode.svelte';

  let testNode = { x: 0, y: 0, neighbors: [], weight: 0 };
</script>

<div class="ma-2">
  <Menu hover>
    <div slot="activator">
      <Button class="black primary-text">View Legend</Button>
    </div>
    <List>
      <ListItem style="width: 100%;"
        ><span style="display: flex; align-items: center;"
          ><GridNode {...testNode} isSource={true} />&nbsp;Source Node</span
        ></ListItem
      >
      <ListItem style="width: 100%;"
        ><span style="display: flex; align-items: center;"
          ><GridNode {...testNode} isTarget={true} />&nbsp;Target Node</span
        ></ListItem
      >
      <ListItem style="width: 100%;"
        ><span style="display: flex; align-items: center;"
          ><GridNode {...testNode} isWall={true} />&nbsp;Wall Node</span
        ></ListItem
      >
      <ListItem style="width: 100%;"
        ><span style="display: flex; align-items: center;"
          ><GridNode {...testNode} isVisited={true} />&nbsp;Visited Node</span
        ></ListItem
      >
      <ListItem style="width: 100%;"
        ><span style="display: flex; align-items: center;"
          ><GridNode {...testNode} isPath={true} />&nbsp;Path Node</span
        ></ListItem
      >
    </List>
  </Menu>
</div>
