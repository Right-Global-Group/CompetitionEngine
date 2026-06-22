<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <div
        wire:ignore
        x-data="{
            editor: null,
            init() {
                const initialData = @js($getState() ? (is_string($getState()) ? json_decode($getState(), true) : $getState()) : ['blocks' => []]);
                const statePath = @js($getStatePath());

                this.editor = new EditorJS({
                    holder: '{{ $getId() }}-holder',
                    data: initialData,
                    tools: {
                        header:    { class: Header,    inlineToolbar: true },
                        list:      { class: List,      inlineToolbar: true },
                        quote:     { class: Quote,     inlineToolbar: true },
                        delimiter: { class: Delimiter },
                        code:      { class: CodeTool },
                    },
                    onChange: async () => {
                        const output = await this.editor.save();
                        $wire.set(statePath, JSON.stringify(output));
                    },
                    placeholder: 'Start writing your post...',
                });
            }
        }"
    >
        <div
            id="{{ $getId() }}-holder"
            class="min-h-[300px] rounded-lg border border-gray-200 bg-white p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        ></div>
    </div>
</x-dynamic-component>
