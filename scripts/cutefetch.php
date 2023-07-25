<?
class cutefetch
{
    public $buffer = [];

    function __construct()
    {
    }

    function script($script)
    {
        $this->buffer[] = ['script', $script];
    }

    public function reset()
    {
        $this->buffer = [];
    }

    public function dispatch()
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($this->buffer);
        exit;
    }
}

$cutefetch = new cutefetch();
